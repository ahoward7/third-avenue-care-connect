function splitFamilyFields(obj: any) {
  const familyFields: { [key: string]: any } = {}
  const sitterFields: { [key: string]: any } = {}

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && key.startsWith('family') && key !== 'family') {
      const newKey = `${key.charAt(6).toLowerCase()}${key.slice(7)}`
      familyFields[newKey] = obj[key]
      delete obj[key]
    }

    if (Object.prototype.hasOwnProperty.call(obj, key) && key.startsWith('sitter') && key !== 'sitter') {
      const newKey = `${key.charAt(6).toLowerCase()}${key.slice(7)}`
      sitterFields[newKey] = obj[key]
      delete obj[key]
    }
  }

  if (Object.keys(familyFields).length > 0) {
    obj.family = familyFields
  }

  if (Object.keys(sitterFields).length > 0) {
    obj.sitter = sitterFields
  }

  return obj
}

export function formatJobs(jobs: any[]) {
  return jobs.map(job => splitFamilyFields(job))
}
