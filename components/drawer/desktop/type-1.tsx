/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import Button from "../../button";
import { IconX } from "@tabler/icons";

const Type3 = ({
  show,
  title,
  children,
  zIndex,
  contentBackground,
  onHide,
  onSave,
  saveTitle,
  onSelect,
  // isEdit,
  onBack,
}: any): JSX.Element => (
  <>
    <div
      className={`drawer-type-3-filter ${show ? "show" : ""}`}
      onClick={onHide || onBack}
    />
    <div className={`drawer-type-3 ${show ? "show" : ""}`}>
      <div className="head">
        <div className="navigation">
          <span className="title">{title}</span>
        </div>
        <div className="action">
          {typeof onHide === "function" && (
            <span>
              <IconX stroke="1.5" onClick={onHide} />
            </span>
          )}
        </div>
      </div>
      <div className="content">{children}</div>
      {
        typeof onSave === "function" ? (
          <div className="footer-btn grid">
            <div className={typeof onSelect === "function" ? "col-4" : "col-6"}>
              <Button
                block
                color="#000"
                size="medium"
                variant="secondary"
                font_family="system-ui"
                font_weight="500"
                on_click={onBack||onHide}
              >
                Cancel
              </Button>
            </div>
            {typeof onSelect === "function" && (
              <div className="col-4">
                <Button
                  block
                  color="#000"
                  size="medium"
                  variant="secondary"
                  font_family="system-ui"
                  font_weight="500"
                  on_click={onSelect}
                >
                  ADD NEW COLLECTION
                </Button>
              </div>
            )}
            <div className={typeof onSelect === "function" ? "col-4" : "col-6"}>
              <Button
                block
                size="medium"
                variant="primary"
                font_family="system-ui"
                font_weight="500"
                on_click={onSave}
              >
                {saveTitle}
              </Button>
            </div>
          </div>
        ) : (
          <div className="footer-btn grid">
            <div className="col-12">
              <Button
                block
                color="#000"
                size="medium"
                variant="secondary"
                font_family="system-ui"
                font_weight="500"
                on_click={onBack}
              >
                Cancel
              </Button>
            </div>
          </div>
        )
        // 	: (
        // 		<div className="footer-btn grid">
        // 			<div className="col-12">
        // 				<Button block size="medium" variant="primary-bs"
        // font_family="system-ui"
        // font_weight="500"
        // on_click={onSave}>{saveTitle}</Button>
        // 			</div>
        // 		</div>
        // 	)
      }
    </div>
    <style>
      {`
				${
          show &&
          `
					html, body {
						overflow: hidden;
						z-index: 1;
					}
				`
        }
			`}
    </style>
    <style jsx>
      {`
        .drawer-type-3-filter {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: #000;
          z-index: ${zIndex - 1};
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s ease;
        }
        .drawer-type-3-filter.show {
          opacity: 0.5;
          visibility: visible;
        }
        .drawer-type-3 {
          position: fixed;
          background: ${contentBackground};
          width: 800px;
          z-index: ${zIndex};
          font-family: system-ui;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s ease;
          height: 30vh;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .drawer-type-3.show {
          height: 90vh;
          opacity: 1;
          visibility: visible;
        }
        .drawer-type-3 .head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 5vh;
          padding: 10px 20px;
          background: #fff;
          border-bottom: 1px solid #dfe3e8;
        }
        .drawer-type-3 .head .navigation {
          display: flex;
          align-items: center;
        }
        .drawer-type-3 .head .navigation span.title {
          font-weight: 600;
          font-style: normal;
          font-size: 16px;
          line-height: 16px;
        }
        .drawer-type-3 .head .action span:hover {
          cursor: pointer;
        }
        .drawer-type-3 .content {
          height: 75vh;
          overflow-y: scroll;
          box-sizing: border-box;
        }
        .drawer-type-3 .content::-webkit-scrollbar {
          display: none;
        }
        .drawer-type-3 .footer-btn {
          width: 800px;
          padding: 20px;
          margin: 0;
          background: #fff;
          box-shadow: 0px -3px 10px rgba(145, 158, 171, 0.1);
          position: fixed;
          bottom: 0;
          box-sizing: border-box;
          grid-gap: 8px;
          z-index: ${zIndex + 1};
        }
      `}
    </style>
  </>
);

Type3.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string.isRequired,
  saveTitle: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  zIndex: PropTypes.number.isRequired,
  contentBackground: PropTypes.string.isRequired,
  onHide: PropTypes.func,
  onSave: PropTypes.func,
  onBack: PropTypes.func,
  onSelect: PropTypes.func,
  // isEdit: PropTypes.bool,
};

export default React.memo(Type3);
