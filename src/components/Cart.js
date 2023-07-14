import React from 'react';

function Cart({cart}) {

    return (
        <>
            <h1>{'Cart'}</h1>
            <div>
                {cart}
            </div>
        </>
    );
}

export default Cart;