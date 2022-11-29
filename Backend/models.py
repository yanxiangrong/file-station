import mimetypes
import os
from enum import Enum
from stat import S_ISDIR

from pydantic import BaseModel


class ServerFilePath(BaseModel):
    path: str


class FileType(Enum):
    UNKNOWN = 1
    FOLDER = 2
    TEXT = 3
    IMAGE = 4
    VIDEO = 5
    AUDIO = 6


class FileInfo(BaseModel):
    name: str
    isDir: bool
    size: int
    accessTime: int
    modifyTime: int
    createTime: int
    type: FileType

    def __init__(self, name: str = None, stat: os.stat_result = None, **kwargs):
        is_dir = False
        if name is not None:
            kwargs['name'] = name
        if stat is not None:
            kwargs['isDir'] = is_dir = S_ISDIR(stat.st_mode)
            kwargs['size'] = stat.st_size
            kwargs['accessTime'] = int(stat.st_atime)
            kwargs['modifyTime'] = int(stat.st_mtime)
            kwargs['createTime'] = int(stat.st_mtime)

        if name is not None and stat is not None:
            if is_dir:
                kwargs['type'] = FileType.FOLDER
            else:
                kwargs['type'] = mime_to_type(mimetypes.guess_type(name)[0] or 'unknown/unknown')

        BaseModel.__init__(self, **kwargs)


def mime_to_type(mime_type: str):
    match mime_type[:mime_type.find('/')]:
        case 'text':
            return FileType.TEXT
        case 'image':
            return FileType.IMAGE
        case 'video':
            return FileType.VIDEO
        case 'audio':
            return FileType.AUDIO
        case 'unknown':
            return FileType.UNKNOWN
        case _:
            return FileType.UNKNOWN
