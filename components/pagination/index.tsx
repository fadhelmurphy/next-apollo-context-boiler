import React from 'react'

import Mobile from './mobile'
import Desktop from './desktop'

const Pagination = ({
  is_mobile,
  is_warehouse,
  page,
  per_page,
  total_page,
  scroll_id,
  button_top_id,
  update_page,
  item_type,
  page_start,
}: any) => {
  const props = {
    is_mobile: is_mobile || false,
    is_warehouse: is_warehouse || false,
    page: page,
    scroll_id: scroll_id || 'top-page',
    button_top_id: button_top_id || scroll_id,
    total_page: total_page || 0,
    per_page: per_page || 10,
    item_type: item_type || 'page',
    page_start: is_mobile
      ? // Pagination Mobile
        page > 4 && total_page > 6 && page > total_page - 3
        ? total_page - 4
        : page > 4 && total_page > 6
        ? page - 2
        : 1
      : // Pagination Desktop
      page > 5 && total_page > 8 && page > total_page - 4
      ? total_page - 6
      : page > 5 && total_page > 8
      ? page - 3
      : 1,
    page_list: is_mobile
      ? // Mobile
        total_page <= 6 || (total_page > 6 && page < 5)
        ? [0, 1, 2, 3, 4, 5]
        : [0, 1, 2, 3, 4]
      : // Desktop
      total_page <= 8 || (total_page > 6 && page < 6)
      ? [0, 1, 2, 3, 4, 5, 6, 7]
      : [0, 1, 2, 3, 4, 5, 6],
    update_page,
  }

  if (is_mobile) {
    return <Mobile {...props} />
  } else {
    return <Desktop {...props} />
  }
}

export default Pagination
