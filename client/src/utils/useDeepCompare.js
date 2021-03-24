import { useEffect, useRef } from "react";

const useDeepCompare = (value, container) => {
	const ref = useRef();
	if (typeof ref.current === "undefined") {
		ref.current = container;
	}
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
};

export default useDeepCompare;
