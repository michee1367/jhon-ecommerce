
export const getNormalNameTable = (resource) => {
    if(resource.legend?.label) {
      return resource.legend?.label
    }
    
    return resource?.normalName

  }


export const getNormalNameField = (resource, fieldName) => {
    
    if(resource.legend?.attributes && resource.legend?.attributes[fieldName]) {
      return resource.legend?.attributes[fieldName]
    }
    return fieldName

  }