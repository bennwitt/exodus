from datetime import datetime


def _walk_tree(mapping: dict) -> list[dict]:
    """Walk the node tree in BFS order, extracting messages."""
    # Find root node (parent is None or missing)
    root_id = None
    for node_id, node in mapping.items():
        if not node.get("parent"):
            root_id = node_id
            break

    if not root_id:
        # Fallback: find node whose parent isn't in mapping
        for node_id, node in mapping.items():
            if node.get("parent") not in mapping:
                root_id = node_id
                break

    if not root_id:
        return []

    ordered = []
    queue = [root_id]
    seen = set()

    while queue:
        node_id = queue.pop(0)
        if node_id in seen:
            continue
        seen.add(node_id)

        node = mapping.get(node_id, {})
        msg = node.get("message")

        if msg:
            role = msg.get("author", {}).get("role", "")
            content = msg.get("content", {})

            # Handle both string and structured content
            parts = content.get("parts", []) if isinstance(content, dict) else []
            text = " ".join(str(p) for p in parts if isinstance(p, str)).strip()

            if text and role in ("user", "assistant"):
                ordered.append(
                    {
                        "role": role,
                        "content": text,
                        "timestamp": msg.get("create_time", 0),
                    }
                )

        for child_id in node.get("children", []):
            if child_id not in seen:
                queue.append(child_id)

    return ordered


def parse_conversations(data: list) -> list[dict]:
    """
    Parse OpenAI conversations.json export into flat conversation list.
    Each item: {title, date, messages: [{role, content, timestamp}]}
    """
    conversations = []

    for conv in data:
        title = conv.get("title", "Untitled")
        create_time = conv.get("create_time", 0)
        mapping = conv.get("mapping", {})

        messages = _walk_tree(mapping)

        if not messages:
            continue

        conversations.append(
            {
                "title": title,
                "create_time": create_time,
                "date": (
                    datetime.fromtimestamp(create_time).isoformat()
                    if create_time
                    else None
                ),
                "messages": messages,
            }
        )

    # Sort by date ascending
    conversations.sort(key=lambda c: c.get("create_time", 0))
    return conversations
