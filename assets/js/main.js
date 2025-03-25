class ValidaFormulário {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos()



    }

    //função arrow não permite alteração no THIS.
    eventos() {   
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault(); //evita que o formulário seja enviado;
        const isValid = this.isValid();
    }

    isValid() {
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove(); //remove todos os errorText antes de enviar
        }
        
        for(let campo of this.formulario.querySelectorAll('.validar')){
            const label = campo.previousElementSibling.innerText; //pega elemento anterior
            //string vazia avalia em falso;
            if(!campo.value) {
                this.createError(campo, `Campo ${label} não pode estar vazio`)
                valid = false; //reseta o statuos
            }
          
        }
    }
    createError(campo, msg) {

        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend', div); //adiciona a DIV com erro depois do campo;
        
    }

}

const valida = new ValidaFormulário();