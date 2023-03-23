class ButtonElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<style>
        .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            position: relative;
            box-sizing: border-box;
            outline: 0;
            border: 0;
            margin: 0;
            user-select: none;
            vertical-align: middle;
            text-decoration: none;
            font-family: "Roboto","Helvetica","Arial",sans-serif;
            font-weight: 500;
            line-height: 1.75;
            letter-spacing: 0.02857em;
            text-transform: uppercase;
            min-width: 64px;
            padding: 6px 16px;
            transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            color: #fff;
            box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
            margin-top: 24px;
            margin-bottom: 24px;
            border-radius: 0.25rem;
            height: 3rem;
            background-color: #0d6efd;
            font-size: 0.875rem;
        }
        .button:hover{
            background-color: #0288d1;
        }
          </style><button class="button">+ Add</button>`;
        
    }
    constructor() {
        super();
      }
}

customElements.define('web-button-element', ButtonElement);