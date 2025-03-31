export function snakeToCamel(snake: string): string {
  return snake.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

export function convertKeysToCamel<T extends Record<string, any>>(rows: T | T[]): T | T[] {
  if (!Array.isArray(rows)) {
    const newRow: Record<string, any> = {}
    for (const key in rows) {
      if (Object.prototype.hasOwnProperty.call(rows, key)) {
        newRow[snakeToCamel(key)] = rows[key]
      }
    }
    return newRow as T
  }

  return rows.map((row: any) => {
    const newRow: Record<string, any> = {}
    for (const key in row) {
      if (Object.prototype.hasOwnProperty.call(row, key)) {
        newRow[snakeToCamel(key)] = row[key]
      }
    }
    return newRow as T
  })
}
