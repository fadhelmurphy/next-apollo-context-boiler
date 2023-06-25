import React from 'react'

const Secondary = (props: any) => (
  <button
    id={props.id_element}
    className={`fdn-button-${props.variant}-${props.id_element} ${
      props.block ? `block` : `inline-block`
    } ${props.is_disabled ? `disabled` : ``} ${props.size}`}
    disabled={props.is_disabled}
    onClick={props.on_click}
  >
    {props.children}
    <style>
      {`
        .fdn-button-${props.variant}-${props.id_element} {
          background-color: transparent;
          color: ${props.color || "#637381"};
          border: 1px solid #DFE3E8;
          border-radius: ${props.border_radius};
          cursor: pointer;
          font-family: ${props.font_family};
          font-weight: ${props.font_weight};
          line-height: normal;
          outline: none;
          -webkit-appearance: none;
          padding: ${props.padding};
          margin: ${props.margin}
        }
        .fdn-button-${props.variant}-${props.id_element}.disabled {
          background-color: transparent;
          cursor: not-allowed;
          opacity: 0.6;
        }
        .fdn-button-${props.variant}-${props.id_element}.inline-block {
          display: inline-block;
        }
        .fdn-button-${props.variant}-${props.id_element}.block {
          display: block;
          width: 100%;
        }
        .fdn-button-${props.variant}-${props.id_element}:active {
          filter: brightness(0.85);
        }
        .fdn-button-${props.variant}-${props.id_element}:hover {
          opacity: 0.9;
        }
        .fdn-button-${props.variant}-${props.id_element}.large {
          font-size: 16px;
          height: 48px;
        }
        .fdn-button-${props.variant}-${props.id_element}.medium {
          font-size: 14px;
          height: 40px;
        }
        .fdn-button-${props.variant}-${props.id_element}.small {
          font-size: 14px;
          height: 32px;
        }
      `}
    </style>
  </button>
)

export default Secondary
