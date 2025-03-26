class ValidaFormulário {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
      }

    //função arrow não permite alteração no THIS.
    eventos() {
        this.formulario.addEventListener('submit', e => {
          this.handleSubmit(e);
        });
      }

    handleSubmit(e) {
        
    e.preventDefault();
    console.log('handleSubmit foi chamado!')
    const camposValidos = this.camposSaoValidos();
    const senhasValidas = this.senhasSaoValidas();

    if(camposValidos && senhasValidas) {
      alert('Formulário enviado.');
      this.formulario.submit();
    }
  }


  senhasSaoValidas() {
    let valid = true;

    const senha = this.formulario.querySelector('.senha');
    const repetirSenha = this.formulario.querySelector('.repetir-senha');

    if(senha.value !== repetirSenha.value) {
      valid = false;
      this.criaErro(senha, 'Campos senha e repetir senha precisar ser iguais.');
      this.criaErro(repetirSenha, 'Campos senha e repetir senha precisar ser iguais.');
    }

    if(senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres.');
    }

    return valid;
  }


   camposSaoValidos() {
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

            if(campo.classList.contains('cpf')) {
                if(!this.validaCPF(campo)) valid = false;
            }

            if(campo.classList.contains('usuario')) {
                if(!this.validaUsuario(campo)) valid = false;
            }
          
        }

        return valid;
    }

   


    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;

        if (usuario.length < 3 || usuario.length > 12) {
            this.createError(campo, 'Nome de Usuário precisa ter entre 3 e 12 caracteres.')
            valid = false;
        }

        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(campo, 'Nome de Usuário precisa conter apenas letras e/ou números.')
            valid = false;
        }

        return valid;
    }

    validaCPF(campo) {

        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()) {
            this.createError(campo, 'CPF Inválido!')
            return false;
        }

        return true;

    }


    createError(campo, msg) {

        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text')
        campo.insertAdjacentElement('afterend', div); //adiciona a DIV com erro depois do campo;
        
    }

}

const valida = new ValidaFormulário();