import { Modal, Button } from 'antd';
import React from 'react';

export const info = (title,content) => {

  Modal.info({
    title: title,
    content: (
      <div>
        {content}
      </div>
    ),
    onOk() {},
  });

}

export const success = (title,content) => {
  Modal.success({
    title: title,
    content: content,
  });
}

export const error = (title,content) => {
  Modal.error({
    title: title,
    content: content,
  });
}

export const warning = (title,content) => {
  Modal.warning({
    title: title,
    content: content,
  });
}
