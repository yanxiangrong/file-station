from pathlib import Path

threshold = 0.9
size_map = {}
count = 0
max_count = 0
file = "C:/Users/Yan_X/Desktop/tmp/"
for i_file in Path(file).iterdir():
    if not i_file.is_file():
        continue

    size = i_file.stat().st_size // 1024 + 1
    try:
        size_map[size] += 1
    except KeyError:
        size_map[size] = 1
    max_count += 1

print('max_count: ', max_count)
for i in range(100):
    try:
        count += size_map[i]
    except KeyError:
        continue
    if count >= (max_count * threshold):
        print(i)
        break
