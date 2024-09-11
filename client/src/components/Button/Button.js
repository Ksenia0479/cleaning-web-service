import React, { Fragment, useState } from "react";
import classNames from "classnames";

// styles
import "./button.css";

export default ({
  input,
  type = "button",
  id,
  placeholder,
  className = "",
  updatePreviewImage,
  ...custom
}) => {
  const [isFileAttached, setIsFileAttached] = useState(false);

  const fileInputClasses = classNames({
    [className]: true,
    success: isFileAttached
  });

  const onInputChange =
    type === "file"
      ? e => {
          e.preventDefault();
          const file = e.target.files[0];

          input.onChange(file);
          updatePreviewImage(file);
          setIsFileAttached(true);
        }
      : undefined;

  return (
    <Fragment>
      {(type === "submit" || type === "button") && (
        <div className="form__btn">
          <input
            {...input}
            {...custom}
            type={type}
            id={id}
            className={className}
          />
        </div>
      )}

      {type === "file" && (
        <div className="form__file">
          <label className={fileInputClasses} htmlFor={id}>
            {placeholder}
          </label>

          <input
            id={id}
            type={type}
            onChange={onInputChange}
            accept
            className={className}
            {...custom}
          />
        </div>
      )}

      {type === "checkbox" && (
        <div className="form__checkbox">
          <input
            {...input}
            {...custom}
            type={type}
            id={id}
            className={className}
          />
          <label htmlFor="notify-checkbox">Notify me about the updates</label>
        </div>
      )}
    </Fragment>
  );
};
