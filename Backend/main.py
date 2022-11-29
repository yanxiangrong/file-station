import asyncio
import mimetypes
from pathlib import Path
from typing import List

import aiohttp as aiohttp
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import FileResponse, Response

import preview_builder
import utils
from models import FileInfo, ServerFilePath

BASE_FILE_PATH = "C:/Users/Yan_X/Desktop/"
MIME_FILE_PATH = "mime.types"
BACKEND_BASE_URL = "http://localhost:3000/"

mimetypes.init([MIME_FILE_PATH])
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)

client_session = aiohttp.ClientSession(base_url=BACKEND_BASE_URL)


@app.on_event("shutdown")
async def shutdown_event():
    await client_session.close()


@app.get("/")
async def root():
    return await read_file_path('')


@app.get("/{file_path:path}")
async def read_file_path(file_path: str, download: int = 0, preview: int = 0):
    local_path = Path(BASE_FILE_PATH + file_path)
    if local_path.exists() and local_path.is_file():
        if preview:
            tmp_local_path = preview_builder.image_builder(file_path)

            return FileResponse(tmp_local_path, content_disposition_type='inline', filename=Path(tmp_local_path).name)
        if download:
            return FileResponse(local_path, content_disposition_type='attachment', filename=local_path.name)
        else:
            return FileResponse(local_path, content_disposition_type='inline', filename=local_path.name)

    async with client_session.get('/' + file_path) as response:
        return Response(await response.content.read(), response.status, response.headers)


@app.post("/api/path_info", response_model=List[FileInfo])
async def path_info(path: ServerFilePath):
    info_list: List[FileInfo] = []

    local_path = Path(BASE_FILE_PATH + path.path)

    if not local_path.exists():
        raise HTTPException(status_code=400, detail="Path is not exists")
    if local_path.is_file():
        raise HTTPException(status_code=400, detail="Path is a file")

    info_list.append(FileInfo(".", local_path.stat()))

    if local_path != Path(BASE_FILE_PATH):
        info_list.append(FileInfo("..", local_path.parent.stat()))

    for i_file in local_path.iterdir():
        info_list.append(FileInfo(i_file.name, i_file.stat()))

    return info_list


async def main():
    config = uvicorn.Config("main:app", port=8000, log_level="info")
    server = uvicorn.Server(config)
    await server.serve()


if __name__ == "__main__":
    asyncio.run(main())
