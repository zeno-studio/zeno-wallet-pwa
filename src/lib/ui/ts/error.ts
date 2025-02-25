
import { trimToLength } from './formatter'
export function errorToString(error: unknown, maxLength = 240): string {
    let errorMessage = ''
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    } else if (typeof error === 'number') {
      errorMessage = `Error code: ${error}`
    } else {
      errorMessage = JSON.stringify(error)
    }
  
    return trimToLength(errorMessage, maxLength)
  }


  