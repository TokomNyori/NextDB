export function getCategory({ targetValue, pageName, currentYear }:
    { targetValue: string, pageName: string, currentYear?: any }
) {
    if (pageName === 'movies') {
        if (targetValue === 'top_rated') {
            return 'top rated movies'
        } else if (targetValue === 'now_playing') {
            return 'now playing (movies)'
        } else {
            return targetValue + ' movies'
        }
    } else if (pageName === 'anime') {
        if (targetValue === 'top anime') {
            return 'top anime'
        } else if (targetValue === `season winter ${currentYear}`) {
            return `season winter: ${currentYear}`
        } else if (targetValue === `season spring ${currentYear}`) {
            return `season spring: ${currentYear}`
        } else if (targetValue === `season summer ${currentYear}`) {
            return `season summer: ${currentYear}`
        } else if (targetValue === `season fall ${currentYear}`) {
            return `season fall: ${currentYear}`
        } else if (targetValue === `season winter ${currentYear + 1}`) {
            return `season winter: ${currentYear + 1}`
        } else {
            return targetValue
        }
    } else {
        if (targetValue === 'top_rated') {
            return 'top rated tv series'
        } else if (targetValue === 'now_playing') {
            return 'now playing (tv series)'
        } else if (targetValue === 'on_the_air') {
            return 'on the air (tv series)'
        } else {
            return targetValue + ' tv series'
        }
    }
}