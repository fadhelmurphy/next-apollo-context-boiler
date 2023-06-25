import React from 'react'

const Desktop = (props: any) => {
  if (props.total_page > 1) {
    return (
      <div className="paging">
        <div id="pagination__item" className="paging-number">
          {parseInt(props.page) === 1 ? (
            <div
              id={`id_prev_${props.item_type}`}
              className="paging-prev-text-inactive"
            >
              Prev
            </div>
          ) : (
            <a
              id={`id_prev_${props.item_type}`}
              className="paging-prev-text-active"
              onClick={() => {
                
                props.update_page(parseInt(props.page) - 1)
              }}
            >
              Prev
            </a>
          )}

          <div className="paging-list-number">
            {props.page > 5 &&
            props.total_page > 6 &&
            props.total_page !== 8 ? (
              <a
                id="id-button-page-1"
                onClick={() => {
                  
                  props.update_page(1)
                }}
              >
                <span className="paging-button">1</span>
              </a>
            ) : null}
            {props.page > 5 &&
            props.total_page > 6 &&
            props.total_page !== 8 ? (
              <span className="paging-button-dots">...</span>
            ) : null}
            {props.page_list.map((item: any, idx: any) => {
              if (item + props.page_start === parseInt(props.page)) {
                // Current page
                return (
                  <div
                    id={'id-button-page-' + props.page}
                    key={idx}
                    className="paging-button-active"
                  >
                    {props.page}
                  </div>
                )
              } else {
                // New page
                if (item + props.page_start <= props.total_page) {
                  return (
                    <a
                      id={
                        'id-button-page-' + (props.page_start + item)
                      }
                      key={idx}
                      onClick={() => {
                        
                        props.update_page(item + props.page_start)
                      }}
                    >
                      <span className="paging-button">
                        {item + props.page_start}
                      </span>
                    </a>
                  )
                } else {
                  return null
                }
              }
            })}
            {props.total_page - props.page > 3 &&
            props.total_page > 6 &&
            props.total_page !== 8 ? (
              <span className="paging-button-dots">...</span>
            ) : null}
          </div>

          {
            /* Next Page */
            parseInt(props.page) < props.total_page ? (
              <a
                id={`id_next_${props.item_type}`}
                className="paging-prev-text-active"
                onClick={() => {
                  /* window.dataLayer.push({
                    event: GTM.BUTTON_NEXT
                  }) */
                  
                  props.update_page(parseInt(props.page) + 1)
                }}
              >
                Next
              </a>
            ) : (
              <div
                id={`id_next_${props.item_type}`}
                className="paging-prev-text-inactive"
              >
                Next
              </div>
            )
          }
        </div>

        <style jsx>
          {`
              .ic-arrow-up {
                font-size: 18px;
              }
              .paging {
                margin: 0;
                flex-shrink: 0;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .paging-number {
                display: flex;
                align-items: center;
              }
              .paging-list-number {
                padding: 0px 15px;
                display: flex;
                flex-flow: row;
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
                font-size: 16px;
                color: #4A4A4A;
                border: solid 1px #E0E0E0;
                margin: 0px 2px;
                width: 42px;
                height: 42px;
                border-radius: 4px;
                text-decoration: none;
                background-color: #FFF;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .paging-button:hover {
                // background-color: #e0e0e0;
                cursor:pointer;
                border: 1px solid #9b9b9b;
              }
              .paging-button-dots {
                font-family: Montserrat;
                font-size: 16px;
                color: #4A4A4A;
                border: solid 1px #E0E0E0;
                margin: 0px 2px;
                width: 42px;
                height: 42px;
                border-radius: 4px;
                text-decoration: none;
                background-color: #FFF;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .paging-button-dots:hover {
                cursor: default;
              }
              .paging-button-active {
                font-family: Montserrat;
                font-size: 16px;
                color: ${props.is_warehouse ? '#fff' : '#4A4A4A'};
                border: none;
                margin: 0px 2px;
                width: 42px;
                height: 42px;
                border-radius: 4px;
                text-decoration: none;
                background-color: ${
                  props.is_warehouse ? '#49A09D' : '#D0D0D0'
                };
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: default;
              }
            `}
        </style>
      </div>
    )
  } else {
    return null
  }
}

export default Desktop
