import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "./styles.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function DragFromOutsideLayout() {
  const [compactType, setcompactType] = useState("vertical");
  const [mounted, setmounted] = useState(false);
  const [layout, setlayout] = useState([
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 3, h: 2 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
    { i: "d", x: 0, y: 2, w: 1, h: 2 }
  ]);

  useEffect(() => {
    setmounted(true);
  }, []);

  const onCompactTypeChange = () => {
    const oldCompactType = compactType;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
        ? null
        : "horizontal";
    setcompactType(compactType);
  };

  const onDrop = elemParams => {
    alert(
      `Element parameters:\n${JSON.stringify(
        elemParams,
        ["x", "y", "w", "h"],
        2
      )}`
    );
  };

  return (
    <div>
      <div>Compaction type: {compactType || "No Compaction"}</div>
      <button onClick={onCompactTypeChange}>Change Compaction Type</button>
      <div
        className="droppable-element"
        draggable={true}
        unselectable="on"
        // this is a hack for firefox
        // Firefox requires some kind of initialization
        // which we can do by adding this attribute
        // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
        onDragStart={e => e.dataTransfer.setData("text/plain", "")}
      >
        Droppable Element (Drag me!)
      </div>
      <ResponsiveReactGridLayout
        {...this.props}
        rowHeight={30}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        layout={layout}
        // onLayoutChange={this.onLayoutChange}
        onDrop={onDrop}
        // WidthProvider option
        measureBeforeMount={false}
        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
        // and set `measureBeforeMount={true}`.
        useCSSTransforms={mounted}
        compactType={compactType}
        preventCollision={!compactType}
        isDroppable={true}
        droppingItem={{ i: "xx", h: 50, w: 250 }}
      >
        {layout.map((itm, i) => (
          <div key={itm.i} data-grid={itm} className="block">
            {i}
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}
