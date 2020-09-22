import React from 'react'
import './Header.sass'

const Header = () => {
    return (
        <header className="header">
            <img className="header__logo"
                 src="https://marketplace-assets-production.s3-us-west-2.amazonaws.com/vault/items/preview-563cf163-2aac-41ac-be0c-7a010a141f38-UqPnD.png"
                 alt="Logo"/>
        </header>
    )
}

export default Header