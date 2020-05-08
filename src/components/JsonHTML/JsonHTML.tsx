import React from "react";
import "./JsonHTML.css";
import { IconButton, Grid } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

interface Props {
  title?: string;
  json: { [key: string]: any };
  closeView: () => void;
}

export default function JsonHTML(props: Props) {
  const { title, json, closeView } = props;

  const getRender = (): JSX.Element => {
    const handleBoolean = (
      value: boolean,
      key: string | number,
      displayTitle?: boolean
    ): JSX.Element => {
      const valueElement: JSX.Element = <h6 id="value">{value ? "True" : "False"}</h6>;

      //healthy
      return (
        <li key={key} className="container-field">
          {displayTitle ? <h6 id="healthy">{key + ": "}<span>{valueElement}</span></h6> : null}
        </li>
      );
    };

    const handleText = (
      text: string,
      key: string | number,
      displayTitle?: boolean
    ): JSX.Element => {
      return (
        <li key={key} className="container-field">
          {displayTitle ? <h6 id="key">{key + ": "}<span id="text">{text}</span></h6> : null}
        </li>
      );
    };

    const handleArray = (
      array: Array<any>,
      key: string | number,
      displayTitle?: boolean
    ): JSX.Element => {
      const valueElement: JSX.Element = (
        <ul className="ul-div">
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
            return null;
          })}
        </ul>
      );

      return (
        <li key={key} className="container-field">
          {displayTitle ? <h6>{key}</h6> : null}
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
        <li key={key} className="container-field">
          {displayTitle ? <h6>{key}</h6> : null}
          <ul className="ul-div">{getObjectElement()}</ul>
        </li>
      ) : (
          <ul className="ul-div">{getObjectElement()}</ul>
        );
    };

    return handleObject(json, undefined, false);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={11}>
          {title ? <h5>{title}</h5> : null}
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={closeView}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <div className="container-div">
        {getRender()}
      </div>
    </div>
  );
}
