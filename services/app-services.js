export const snackbarTimeout = 2000

export const getActiveEntries = (payload) => {
    return payload.length > 0 ? payload.filter((p) => p.deleted === false && p.active) : []
}

export const getDeletedEntries = (payload) => {
    return payload.length > 0 ? payload.filter((p) => p.deleted) : []
}

export const getParentEntries = (data, key) => {
    return data.length > 0
        ? data
              .map((item) => {
                  return item[key] === 0
                      ? {
                            ...item,
                            children: data.filter((t) => t[key] === item.id)
                        }
                      : { ...item, children: [] }
              })
              .filter((item) => item[key] === 0)
        : []
}
