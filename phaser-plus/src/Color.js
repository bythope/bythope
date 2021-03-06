/**
 * @typedef {('white'|'red'|'pink'|'purple'|'deep_purple'|'indigo'|'blue'|'light_blue'|'cyan'|'teal'|'green'|'light_green'|'lime'|'yellow'|'amber'|'orange'|'deep_orange'|'brown'|'grey'|'blue_grey'|'black')} ColorType
 */

/**
 * @enum {ColorType}
 */
const Color = {
    WHITE: '#ffffff',
    RED: '#f44336',
    PINK: '#e91e63',
    PURPLE: '#9c27b0',
    DEEP_PURPLE: '#673ab7',
    INDIGO: '#3f51b5',
    BLUE: '#2196f3',
    LIGHT_BLUE: '#03a9f4',
    CYAN: '#00bcd4',
    TEAL: '#009688',
    GREEN: '#4caf50',
    LIGHT_GREEN: '#8bc34a',
    LIME: '#cddc39',
    YELLOW: '#ffeb3b',
    AMBER: '#ffc107',
    ORANGE: '#ff9800',
    DEEP_ORANGE: '#ff5722',
    BROWN: '#795548',
    GREY: '#9e9e9e',
    BLUE_GREY: '#607d8b',
    BLACK: '#000000'
    
}

/**
 * 
 * @param {ColorType} color 
 */
const toHex = (color = 'white') => {
    let key = color.toUpperCase()
    return Color[key] || Color.WHITE
}

export default Color
export { toHex }