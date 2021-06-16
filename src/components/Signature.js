import React, {useRef} from 'react';
import {Image} from 'react-bootstrap';
import useDraggable from './useDraggable';	

function Signature(props) {
	const cardRef = useRef(null);
	useDraggable(cardRef);
	return (
		<div className="signature" ref={cardRef}>
			<Image src={props.src} style={{with:"70px", height: "50px"}}/>
		</div>
	);
}

export default Signature;
