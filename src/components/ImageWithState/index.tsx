import React from "react";
import Image, { ImageProps } from "next/image";
import { SkeletonLoader } from "../SkeletonLoader";

type ImageWithStateProps = ImageProps & {
  fallback: string;
  debug?: string;
};

function ImageWithState({ src, ...props }: ImageWithStateProps): JSX.Element {
  const [loading, setLoading] = React.useState(true);
  const [onErrorSrc, setOnErrorSrc] = React.useState<string | undefined>(
    undefined
  );

  function handleOnError(
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void {
    console.log("handle on error");
    if (e?.currentTarget?.src !== props.fallback) {
      setOnErrorSrc(props.fallback);
    }
  }

  return (
    <div
      style={{
        position: "relative",
        maxWidth: props.width,
        width: "100%",
        height: "100%",
      }}
    >
      {loading === true && (
        <SkeletonLoader
          style={{
            position: "absolute",
            zIndex: props.debug === "true" ? 99 : "auto",
            top: "-2px",
          }}
        />
      )}
      <Image
        {...props}
        src={onErrorSrc || src}
        onLoadingComplete={() => !props.debug && setLoading(false)}
        onError={(e) => handleOnError(e)}
        fill
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}

export { ImageWithState };
