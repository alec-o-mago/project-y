import PropTypes from 'prop-types'

export default function Button ({label="Button", textColor="#FFFFFF", bgColor = "#1D9BF0", borderColor="#1D9BF0", minWidth="30px", scale=1, onClick=()=>console.log("Clicked"), ...props}) {

  return (
    <div>
      <button
        className={`border h-10 px-5 m-3 lg:m-1 font-semibold rounded-full w-auto`}
        style={{
          color: textColor,
          backgroundColor: bgColor,
          borderColor: borderColor,
          minWidth: minWidth,
          transform: "scale("+scale+")",
        }}
        onClick={onClick}
        {...props}
      >
        {label}
      </button>
    </div>
  )
}

// PropTypes for automatic Storybook settings.
Button.propTypes = {
  label: PropTypes.string,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
  minWidth: PropTypes.string,
  scale: PropTypes.number,
  onClick: PropTypes.func,
}