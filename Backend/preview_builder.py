import subprocess
import threading
from pathlib import Path

import utils

TEMP_DIR_PATH = "C:/Users/Yan_X/Desktop/tmp/"

image_sema = threading.Semaphore(4)


def image_builder(file_path: str):
    out_name = utils.path_id(file_path) + '.webp'
    out_path = TEMP_DIR_PATH + out_name

    if Path(out_path).exists() and Path(out_path).is_file():
        return out_path

    if Path(file_path).stat().st_size <= 26 * 1024:
        return file_path

    cmd = ['ffmpeg', '-loglevel', 'error', '-y', '-i', f'{file_path}', '-c', 'libwebp',
           '-quality', '50', '-vf',
           'scale=(-1):320', out_path]
    image_sema.acquire()
    completed = subprocess.run(cmd)
    image_sema.release()
    if completed.returncode == 0:
        return out_path
    raise "ffmpeg error"
