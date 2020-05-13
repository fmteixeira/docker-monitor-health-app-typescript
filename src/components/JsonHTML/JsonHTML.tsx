import React from "react";
import "./JsonHTML.css";
import { IconButton, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import GetAppIcon from "@material-ui/icons/GetApp";
import FindInPageIcon from "@material-ui/icons/FindInPage";

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
      const valueElement: JSX.Element = (
        <h6 className="healthy-value">{value ? "True" : "False"}</h6>
      );

      return (
        <li key={key} className="container-field">
          {displayTitle ? (
            <h6 className="healthy-status">
              {key + ": "}
              <span>{valueElement}</span>
            </h6>
          ) : null}
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
          {displayTitle ? (
            <h6 className="key">
              {key + ": "}
              <span className="container-info">{text}</span>
            </h6>
          ) : null}
        </li>
      );
    };

    const handleArray = (
      array: Array<any>,
      key: string | number,
      displayTitle?: boolean
    ): JSX.Element => {
      const valueElement: JSX.Element = (
        <ul className="containers-ul">
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
          <ul className="containers-ul">{getObjectElement()}</ul>
        </li>
      ) : (
        <ul className="containers-ul">{getObjectElement()}</ul>
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
        <Grid item xs={1}></Grid>
      </Grid>
      <div className="container-div">
        <div className="close-icon">
          <button id="json-button">
            See in JSON
            <FindInPageIcon fontSize="small" />
          </button>
          <button id="download-button">
            Download
            <GetAppIcon fontSize="small" />
          </button>
          <IconButton>
            <CloseIcon onClick={closeView} fontSize="small" id="close-icon" />
          </IconButton>
        </div>
        {getRender()}
      </div>
    </div>
  );
}
