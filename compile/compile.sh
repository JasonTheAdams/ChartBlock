#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
ROOT="$(dirname ${DIR})"
COMPILE_PATH="${ROOT}/chartblock"

cd ${ROOT}

rsync "${ROOT}/" ${COMPILE_PATH} --exclude-from='compile/files.ignore' -ar

zip -rq chartblock.zip chartblock/

rm -rf ${COMPILE_PATH}

echo "Plugin compressed to: ${ROOT}/chartblock.zip"