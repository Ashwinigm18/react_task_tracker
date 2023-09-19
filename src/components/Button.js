import PropTypes from 'prop-types'

const Button = ({text,onAdd,showAdd}) => {
  return <button onClick={onAdd} style={{backgroundColor:showAdd?'red':'green'}} className='btn'>{text}</button>

}

Button.defaultProps={
    color:'steelblue',
}

Button.propTypes={
    color:PropTypes.string.isRequired,
    text:PropTypes.string.isRequired,
    onclick:PropTypes.func
}
export default Button
