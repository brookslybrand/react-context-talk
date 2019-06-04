import React from 'react'
import { Collapse } from 'antd'

import { getActiveKeys } from './helpers'

const Panel = Collapse.Panel

const SubItems = ({ subItems, toggleSubItemExpanded }) => {
  return (
    <Collapse
      bordered={false}
      activeKey={getActiveKeys(subItems)}
      onChange={ids => toggleSubItemExpanded(ids)}
    >
      {subItems.map(({ id, title, description }) => (
        <Panel header={title} key={id}>
          <p>{description}</p>
        </Panel>
      ))}
    </Collapse>
  )
}

export default SubItems
