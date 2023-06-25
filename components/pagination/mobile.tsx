import React from 'react'

const Mobile = (props:any) => {
  if (props.total_page > 1) {
    return (
      <div id="pagination__item" className="paging-list-item">
        {parseInt(props.page) === 1 ? (
          <a
            id={`id_prev_${props.item_type}`}
            className="paging-prev-text-inactive"
          >
            &lt;
          </a>
        ) : (
          <a
            id={`id_prev_${props.item_type}`}
            className="paging-prev-text-active"
            onClick={() => {
              
              props.update_page(parseInt(props.page) - 1)
            }}
          >
            &lt;
          </a>
        )}

        <div className="paging-list-number">
          {props.page > 4 &&
          props.total_page > 4 &&
          props.total_page !== 6 &&
          props.total_page !== props.page ? (
            <a
              id="id-button-page-1"
              onClick={() => {
                
                props.update_page(1)
              }}
            >
              <span className="paging-button">1</span>
            </a>
          ) : null}
          {props.page > 4 &&
          props.total_page > 4 &&
          props.total_page !== 6 &&
          props.total_page !== props.page ? (
            <span className="paging-button">...</span>
          ) : null}
          {props.page_list.map((item: any, idx: any) => {
            if (item + props.page_start === parseInt(props.page)) {
              // Current page
              return (
                <a
                  id={'id-button-page-' + props.page}
                  key={idx}
                  className="paging-button-active"
                >
                  {props.page}
                </a>
              )
            } else {
              // New page
              if (item + props.page_start <= props.total_page) {
                return (
                  <a
                    id={'id-button-page-' + (props.page_start + item)}
                    key={idx}
                    className="paging-button"
                    onClick={() => {
                      
                      props.update_page(item + props.page_start)
                    }}
                  >
                    {item + props.page_start}
                  </a>
                )
              } else {
                return null
              }
            }
          })}
          {props.total_page - props.page > 2 &&
          props.total_page > 5 &&
          props.total_page !== 6 ? (
            <span className="paging-button">...</span>
          ) : null}
        </div>

        {
          /* Next Page */
          parseInt(props.page) < props.total_page ? (
            <a
              id={`id_next_${props.item_type}`}
              className="paging-prev-text-active"
              onClick={() => {
                
                props.update_page(parseInt(props.page) + 1)
              }}
            >
              &gt;
            </a>
          ) : (
            <a
              id={`id_next_${props.item_type}`}
              className="paging-prev-text-inactive"
            >
              &gt;
            </a>
          )
        }
        <div
          className="button-to-top"
          id={`id_up_${props.item_type}`}
        >
          <i className="icon-ic_more_dropdown_up_white ic-arrow-up" />
        </div>

        <style jsx>
          {`
              .ic-arrow-up {
                font-size: 12px;
              }
              .button-to-top {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 24px;
                height: 24px;
                border-radius: 4px;
                border: solid 1px ${
                  props.is_warehouse ? '#49A09D' : '#db284e'
                };
                background-color: ${
                  props.is_warehouse ? '#49A09D' : '#db284e'
                };
                margin-left: auto;
              }
              .paging {
                margin: 0 auto;
                flex-shrink: 0;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20px;
                padding-bottom: 40px;
              }
              .paging-number {
                display: flex;
                align-items: center;
              }
              .paging-list-item {
                width: fit-content;
                display: flex;
                flex-flow: row;
                align-items: center;
                align-self: left;
                background-color: #fff;
                width: 100%;
              }
              .paging-list-number {
                display: flex;
                flex-flow: row;
                margin: 0 5px;
              }
              .paging-prev-text-active {
                font-family: Montserrat;
                font-size: 16px;
                color: #4A4A4A;
                cursor: pointer;
              }
              .paging-prev-text-inactive {
                font-family: Montserrat;
                font-size: 16px;
                color: #D0D0D0;
              }
              .paging-button {
                font-family: Montserrat;             
                font-weight: bold;
                font-size: 12px;
                align-self: normal;
                color: #4A4A4A;
                border: solid 1px #E0E0E0;
                margin: 0px 2px;
                width: 24px;
                height: 24px;
                border-radius: 4px;
                text-decoration: none;
                background-color: #FFF;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .paging-button-active {
                font-family: Montserrat;             
                font-weight: bold;
                font-size: 12px;
                align-self: normal;
                color: ${props.is_warehouse ? '#fff' : '#4A4A4A'};
                border: none;
                margin: 0px 2px;
                width: 24px;
                height: 24px;
                border-radius: 4px;
                text-decoration: none;
                background-color: ${
                  props.is_warehouse ? '#49A09D' : '#D0D0D0'
                };
                display: flex;
                justify-content: center;
                align-items: center;
              }
            `}
        </style>
      </div>
    )
  } else {
    return null
  }
}

export default Mobile
