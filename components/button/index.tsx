import React from 'react'
import Primary from './primary'
import Secondary from './secondary'

// config button variant to use from props
const Template = [
  {
    id: 'primary',
    component: Primary,
  },
  {
    id: 'secondary',
    component: Secondary,
  },
]

/**
 *
 * @param {String} props.id_element
 * @param {Boolean} props.is_disabled
 * @param {Boolean} props.is_loading
 * @param {Boolean} props.is_mobile
 * @param {String} props.variant
 * @param {Boolean} props.block
 * @param {String} props.font_family
 * @param {String} props.font_weight
 * @param {String} props.border_radius
 * @param {String} props.padding
 * @param {String, <any>} props.children
 * @param {String} props.size
 * @param {Function} props.on_click
 */

interface IProps {
  id_element?: string,
  is_disabled?: boolean,
  is_loading?: boolean,
  is_mobile?: boolean,
  variant?: string,
  block?: boolean,
  font_family?: string,
  font_weight?: string,
  border_radius?: string,
  color?: string,
  padding?: string,
  margin?: string,
  children?: React.ReactNode,
  size?: string,
  on_click?: () => void, 
}

const Button = ({
  id_element,
  is_disabled,
  is_loading,
  is_mobile,
  variant,
  block,
  font_family,
  font_weight,
  border_radius,
  color,
  padding,
  children,
  size,
  on_click,
  margin,
}: IProps) => {
  const props = {
    id_element: id_element || `id-btn-1`,
    is_disabled: is_disabled || false,
    is_loading: is_loading || false,
    is_mobile: is_mobile || false,
    variant: variant || `primary`,
    block: block || false,
    font_family: font_family || `"system-ui", sans-serif`,
    font_weight: font_weight || `bold`,
    border_radius : border_radius || `2px`,
    color: color,
    padding: padding || `0 10px`,
    margin: margin || `0px`,
    children: children,
    size: size || `medium`,
    on_click: on_click || (() => {}), 
  }

  
  return (
    <React.Fragment>
      {Template.filter((item: any) => item.id === props.variant).map(
        (style, idx) => (
          <style.component key={String(idx)} {...props} />
        ),
      )}
    </React.Fragment>
  )
}

export default Button
