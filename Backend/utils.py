import base64
import hashlib


def path_id(path: str):
    h = hashlib.blake2b(digest_size=16)
    h.update(path.encode())
    return base64.b32encode(h.digest()).decode().rstrip('=').lower()
