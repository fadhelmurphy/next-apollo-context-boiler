import React from "react";
const Button = React.lazy(() => import("../../button"));

export default function Desktop({ data = [], onChoose = () => {}, onInfo = () => {} }: any) {
  return (
    <>
      {data?.map((item: any, idx: any) => (
        <div
          key={idx}
          className={`collection-card${item.selected ? " active" : ""}`}
        >
          <div className="collection-card-content">
            <a href={`/collection/${item.name}`}>
              <h2>{item.name}</h2>
            </a>
          </div>
          <div className="collection-card-footer">
            <div className="action">
              <Button
                size="medium"
                variant="primary"
                font_family="system-ui"
                font_weight="500"
                on_click={() => {
                  // HandleChooseCollection({
                  //   key: idx,
                  //   selected: item.selected,
                  // });
                  return onChoose({
                    key: idx,
                    selected: item.selected,
                  });
                }}
              >
                {item.selected? "Unselect" : "Choose"}
              </Button>
              <Button
                color="#000"
                size="medium"
                variant="secondary"
                font_family="system-ui"
                font_weight="500"
                on_click={() => {
                  return onInfo(item);
                  // HandleGetOneCollection(item.name);
                  // handleShowDrawer("detailCollection", true);
                }}
              >
                INFO
              </Button>
            </div>
          </div>
        </div>
      ))}
      <style>
        {`
          .collection-card {
            border: 1px solid #dfe3e8;
          }
          .collection-card.active {
            border: 1px solid #000;
          }
          .collection-card h2 {
            font-family: "system-ui";
            text-transform: capitalize;
            display: flex;
            align-items: center;
          }
          .collection-card-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px;
          }
          .collection-card-content a {
            text-decoration: none;
            color: #000;
          }
          .collection-card-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f9fafb;
            padding: 15px;
          }
          .collection-card-footer .action button:not(:first-child) {
            margin: 0 0 0 10px;
          }
        `}
      </style>
    </>
  );
}
