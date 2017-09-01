Vue.component('form-endereco', {
	
	template : '<form class="form"><div class="form-group row"><div class="col-md-4"><label>CEP:</label><input type="text" name="cep" class="form-control" @keyup="buscar" v-model="cep" ref="cep"></div><div v-if="naoLocalizado" class="col-md-12 text-danger"><p><span>Endereço não localizado,</span> por gentileza insira um CEP válido!</p></div></div><div class="form-group row"><div class="col-md-5"><label>Logradouro:</label><input type="text" name="logradouro" ref="logradouro" class="form-control" v-model="endereco.logradouro"></div><div class="col-md-2"><label>Número:</label><input type="text" name="numero" ref="numero" class="form-control"></div><div class="col-md-5"><label>Complemento:</label><input type="text" name="complemento" class="form-control"></div></div><div class="form-group row"><div class="col-md-5"><label>Bairro:</label><input type="text" name="bairro" class="form-control" v-model="endereco.bairro"></div><div class="col-md-5"><label>Cidade:</label><input type="text" name="cidade" class="form-control" v-model="endereco.localidade"></div><div class="col-md-2"><label>Estado:</label><input type="text" name="estado" class="form-control" v-model="endereco.uf"></div></div></form>',
	
	data: function(){
		return {
			cep : '',
			naoLocalizado: false,
			endereco:{}
		}
	},
	mounted:function(){

		jQuery(this.$refs.cep).mask('00000-000')
	},
	methods :{
		buscar: function(){

			var self = this;

			if(/^[0-9]{5}-[0-9]{3}$/.test(this.cep)){

				self.endereco = {}
				self.naoLocalizado = false

				$.getJSON('https://viacep.com.br/ws/'+this.cep+'/json/', function(endereco){
					if(endereco.erro){
						self.$refs.logradouro.focus()
						self.naoLocalizado =  true
						return
					}
					self.endereco = endereco
					self.$refs.numero.focus()
				});
			}
		}
	}
})