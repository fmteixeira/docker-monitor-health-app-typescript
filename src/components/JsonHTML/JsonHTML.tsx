import React from "react";
// Material-UI
import Paper from "@material-ui/core/Paper";

interface Props {
  title?: string;
  json: { [key: string]: any };
}

export default function JsonHTML(props: Props) {
  const { title, json } = props;

  const getRender = (): JSX.Element => {
    const handleBoolean = (
      value: boolean,
      key: string | number,
      displayTitle?: boolean
    ): JSX.Element => {
      const valueElement: JSX.Element = <p>{value ? "True" : "False"}</p>;

      return (
        <li key={key}>
          {displayTitle ? <h4>{key}</h4> : null}
          {valueElement}
        </li>
      );
    };

    const handleText = (
      text: string,
      key: string | number,
      displayTitle?: boolean
    ): JSX.Element => {
      return (
        <li key={key}>
          {displayTitle ? <h4>{key}</h4> : null}
          <p>{text}</p>
        </li>
      );
    };

    const handleArray = (
      array: Array<any>,
      key: string | number,
      displayTitle?: boolean
    ): JSX.Element => {
      const valueElement: JSX.Element = (
        <ul>
          {array.map((value, i) => {
            if (["string", "number"].includes(typeof value)) {
              return handleText(value, i, false);
            } else if (Array.isArray(value)) {
              return handleArray(value, i, false);
            } else if (typeof value === "boolean") {
              return handleBoolean(value, i, false);
            } else if (typeof value === "object") {
              return handleObject(value, i, false);
            }
          })}
        </ul>
      );

      return (
        <li key={key}>
          {displayTitle ? <h4>{key}</h4> : null}
          {valueElement}
        </li>
      );
    };

    const handleObject = (
      object: Object,
      key?: string | number,
      displayTitle?: boolean
    ): JSX.Element => {
      const getObjectElement = (): Array<JSX.Element> => {
        let element: Array<JSX.Element> = [];
        for (let [key, value] of Object.entries(object)) {
          console.log(`${key}: ${value} -> ${typeof value}`);
          if (["string", "number"].includes(typeof value)) {
            element.push(handleText(value, key, true));
          } else if (Array.isArray(value)) {
            element.push(handleArray(value, key, true));
          } else if (typeof value === "boolean") {
            element.push(handleBoolean(value, key, true));
          } else if (typeof value === "object") {
            element.push(handleObject(value, key, true));
          }
        }
        return element;
      };
      return key ? (
        <li key={key}>
          {displayTitle ? <h4>{key}</h4> : null}
          <ul>{getObjectElement()}</ul>
        </li>
      ) : (
        <ul>{getObjectElement()}</ul>
      );
    };

    return handleObject(json, undefined, false);
  };

  return (
    <Paper>
      {title ? <h4>{title}</h4> : null}
      {getRender()}
    </Paper>
  );
}
