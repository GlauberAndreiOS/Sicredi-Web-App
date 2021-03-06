import axios from 'axios';
import * as React from 'react';
import * as Font from 'expo-font';
import { LineChart } from "react-native-chart-kit";
import ProgressBar from 'react-native-progress/Bar';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInputMask } from 'react-native-masked-text';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, Image, Dimensions, ActivityIndicator, KeyboardAvoidingView, TextInput } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import stylesCadastro from './Styles/stylesCadastro';

function Dashboard({ navigation }) {
  const [quantidade, setQuantidade] = React.useState();
  const [meta, setMeta] = React.useState();
  const [total, setTotal] = React.useState();
  const [indispo, setIndispo] = React.useState();
  const [loading, setLoading] = React.useState(false);

  async function getDashboardData(){
    setLoading(true)
    axios.get('http://localhost:3002/getTotalVeiculos')
    .then((result)=>{
      setTotal(result.data.total)
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>setLoading(false))

    axios.get('http://localhost:3002/getVeiculosIndispo')
    .then((result)=>{
      setIndispo(result.data.indispo)
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>setLoading(false))

    axios.get('http://localhost:3002/getLocacoes')
    .then((result)=>{
      setQuantidade(result.data.locacoes)
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>setLoading(false))

    axios.get('http://localhost:3002/getMeta')
    .then((result)=>{
      setMeta(result.data.meta)
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>setLoading(false))
  }

  React.useEffect(() => {
    getDashboardData()
  }, [])
  
  const data = {
    labels: ["Segunda", "Ter??a", "Quarta", "Quinta", "Sexta"],
    datasets: [
      {
        data: [
          Math.round((Math.random() * 100)),
          Math.round((Math.random() * 100)),
          Math.round((Math.random() * 100)),
          Math.round((Math.random() * 100)),
          Math.round((Math.random() * 100)),
          Math.round((Math.random() * 100))
        ]
      }
    ]
  }

  const chartConfig = {
    backgroundGradientFrom: "#3FA110",
    backgroundGradientFromOpacity: 100,
    backgroundGradientTo: "#3FA110",
    backgroundGradientToOpacity: 0.65,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false // optional
  };

  if(!loading){
    return (
      <View style={{flex: 1, backgroundColor: '#E5E5E5'}}>
        <View style={{flex: 1, backgroundColor: '#E5E5E5', justifyContent: 'space-between', flexDirection: 'row', marginRight: 300}}>
          <BarraLateral navigation={navigation}/>
          <LineChart
            style={{borderRadius: 20, alignSelf: 'flex-start', marginTop: 20, marginLeft: 20}}
            fromZero={true}
            withDots={true}
            withShadow={false}
            segments={5}
            data={data}
            width={windowWidth-250-150}
            height={350}
            chartConfig={chartConfig}
            bezier
          />
        </View>
        <View style={{ backgroundColor: '#E5E5E5', width: (windowWidth-250-150), justifyContent: 'space-between', marginLeft: 110, marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
          <Disponibilidade locacoes={quantidade} totalVeic={total} indisp={indispo} />
          <Indisponiveis indisp={indispo} totalVeic={total} />
          <Meta locacoes={quantidade} meta={meta} />
        </View>
        <View style={{ width: 250, position: 'absolute', backgroundColor: 'white', alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', height: '100%', paddingTop: 30 }}>
        <Image source={{uri:'https://logospng.org/download/sicredi/logo-sicredi-icon-1024.png'}} style={{ width: 92, height: 92 }}/>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', width: 200, marginLeft: 10, marginTop: 20, justifyContent: 'space-between'}} onPress={()=>{navigation.navigate('Loca????es')}}>
            <View style={{width: 50, height: 50, backgroundColor: '#3FA110', justifyContent: 'center', alignItems: 'center', borderRadius: 32}}>
              <Image source={require('./assets/car-key.png')} style={{ width: 32, height: 32}}/>
            </View>
            <Text style={{fontSize: 16, textAlign: 'flex-start', fontFamily: 'MontserratRegular'}}>Loca????es</Text>
            <View style={{borderColor: '#787878', borderWidth: 1, borderRadius: 5}}>
              <AntDesign name="right"  size={24} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', width: 200, marginLeft: 10, marginTop: 20, justifyContent: 'space-between'}} onPress={()=>{navigation.navigate('Ve??culos')}}>
            <View style={{width: 50, height: 50, backgroundColor: '#3FA110', justifyContent: 'center', alignItems: 'center', borderRadius: 32}}>
              <Image source={require('./assets/traffic-jam.png')} style={{ width: 32, height: 32}}/>
            </View>
            <Text style={{fontSize: 16, textAlign: 'flex-start', fontFamily: 'MontserratRegular'}}>Ve??culos</Text>
            <View style={{borderColor: '#787878', borderWidth: 1, borderRadius: 5}}>
              <AntDesign name="right"  size={24} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', width: 200, marginLeft: 10, marginTop: 20, justifyContent: 'space-between'}} onPress={()=>{navigation.navigate('Clientes')}}>
            <View style={{width: 50, height: 50, backgroundColor: '#3FA110', justifyContent: 'center', alignItems: 'center', borderRadius: 32}}>
              <Image source={require('./assets/value.png')} style={{ width: 32, height: 32}}/>
            </View>
            <Text style={{fontSize: 16, textAlign: 'flex-start', fontFamily: 'MontserratRegular'}}>Clientes</Text>
            <View style={{borderColor: '#787878', borderWidth: 1, borderRadius: 5}}>
              <AntDesign name="right"  size={24} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', width: 200, marginLeft: 10, marginTop: 20, justifyContent: 'space-between'}} onPress={()=>{navigation.navigate('Categorias')}}>
            <View style={{width: 50, height: 50, backgroundColor: '#3FA110', justifyContent: 'center', alignItems: 'center', borderRadius: 32}}>
              <Image source={require('./assets/menu.png')} style={{ width: 32, height: 32}}/>
            </View>
            <Text style={{fontSize: 16, textAlign: 'flex-start', fontFamily: 'MontserratRegular'}}>Categorias</Text>
            <View style={{borderColor: '#787878', borderWidth: 1, borderRadius: 5}}>
              <AntDesign name="right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <Text style={{fontSize: 16, textAlign: 'center', paddingTop: 15, fontFamily: 'MontserratBold'}}>Loca????es</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 'bold', fontFamily: 'MontserratBold'}}>{quantidade}</Text>
            <Text style={{fontSize: 16, textAlign: 'center', color: '#787878', fontFamily: 'MontserratBold'}}>/semana</Text>
          </View>
          {meta/3 <= quantidade ? 
            meta/3*2 >= quantidade ? 
              <MaterialCommunityIcons name="speedometer-medium" size={96} color="#3FA110" /> : 
              <MaterialCommunityIcons name="speedometer" size={96} color="#3FA110" /> 
            : <MaterialCommunityIcons name="speedometer-slow" size={96} color="#3FA110" />
          }
          </View>
        </View>
      </View>
    );
  }else{
    return(
      <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} color={'#3FA110'} />
      </View>
    );
  }
}

function Disponibilidade( {locacoes, totalVeic, indisp} ){
  return(
    <View style={{backgroundColor: 'white', width: 300, height: 200, borderRadius: 20, marginRight: 20}}>
      <LinearGradient
        colors={['#3FA110', '#3FA11099']}
        style={{width: 80, height: 70, alignSelf: 'center', alignItems: 'center', justifyContent:'center', top: -35, borderRadius: 20}}>
        <Image source={require('./assets/car-repair.png')} style={{ width: 64, height: 64 }}/>
      </LinearGradient>
      <Text style={{ color: '#3FA110', fontSize: 18, alignSelf: 'center', fontFamily: 'MontserratBold'}}>Disponibilidade</Text>
      <Text style={{ color: '#787878', fontSize: 14, alignSelf: 'center', fontFamily: 'MontserratRegular'}}>Total de carros disponiveis para loca????o</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', marginTop: 40, width: '75%'}}>
        <Text style={{ color: '#3FA110', fontSize: 16, alignSelf: 'center', fontFamily: 'MontserratRegular'}}>Progresso</Text>
        <Text style={{ color: '#3FA110', fontSize: 16, alignSelf: 'center', fontFamily: 'MontserratRegular'}}>{Math.round((1-(locacoes+indisp)/totalVeic)*100)}%</Text>
      </View>{console.log(1-(locacoes+indisp)/totalVeic)}
      <ProgressBar progress={(1-(locacoes+indisp)/totalVeic)}  color='#3FA110' width={225} style={{alignSelf: 'center', marginTop: 10}} />
    </View>
  )
}

function Indisponiveis( {indisp, totalVeic} ){
  return (
    <View style={{backgroundColor: 'white', width: 300, height: 200, borderRadius: 20, marginRight: 20}}>
      <LinearGradient
        colors={['#3FA110', '#3FA11099']}
        style={{width: 80, height: 70, alignSelf: 'center', alignItems: 'center', justifyContent:'center', top: -35, borderRadius: 20}}>
        <Image source={require('./assets/service.png')} style={{ width: 64, height: 64 }}/>
      </LinearGradient>
      <Text style={{ color: '#3FA110', fontSize: 18, alignSelf: 'center', fontFamily: 'MontserratBold'}}>Indispon??veis</Text>
      <Text style={{ color: '#787878', fontSize: 14, alignSelf: 'center', fontFamily: 'MontserratRegular'}}>Em Concerto / Manuten????o</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', marginTop: 40, width: '75%'}}>
        <Text style={{ color: '#3FA110', fontSize: 16, alignSelf: 'center', fontFamily: 'MontserratRegular'}}>Progresso</Text>
        <Text style={{ color: '#3FA110', fontSize: 16, alignSelf: 'center', fontFamily: 'MontserratRegular'}}>{Math.round((indisp/totalVeic)*100)}%</Text>
      </View>
      <ProgressBar progress={(indisp/totalVeic)}  color='#3FA110' width={225} style={{alignSelf: 'center', marginTop: 10}} />
    </View>
  );
}

function Meta( {locacoes, meta} ){
  return(
    <View style={{backgroundColor: 'white', width: 300, height: 200, borderRadius: 20}}>
      <LinearGradient colors={['#3FA110', '#3FA11099']} style={{width: 80, height: 70, alignSelf: 'center', alignItems: 'center', justifyContent:'center', top: -35, borderRadius: 20}}>
        <Image source={require('./assets/target.png')} style={{ width: 60, height: 60 }}/>
      </LinearGradient>
      <Text style={{ color: '#3FA110', fontSize: 18, alignSelf: 'center', fontFamily: 'MontserratBold'}}>Meta</Text>
      <Text style={{ color: '#787878', fontSize: 14, alignSelf: 'center', fontFamily: 'MontserratRegular'}}>Semanal</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', marginTop: 40, width: '75%'}}>
        <Text style={{ color: '#3FA110', fontSize: 16, alignSelf: 'center', fontFamily: 'MontserratRegular'}}>Progresso</Text>
        <Text style={{ color: '#3FA110', fontSize: 16, alignSelf: 'center', fontFamily: 'MontserratRegular'}}>{Math.round((locacoes/meta)*100)}%</Text>
      </View>
      <ProgressBar progress={(locacoes/meta)}  color='#3FA110' width={225} style={{alignSelf: 'center', marginTop: 10}} />
    </View>
  );
}

function Locacao({ navigation }) {
  return (
    <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
      <BarraLateral navigation={navigation}/>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Voc?? est?? em Loca????es</Text>
      </View>
    </View>
  );
}

function Clientes({ navigation }) {

  const [nome, setNome] = React.useState('')
  const [cpf, setCpf] = React.useState()
  const [endereco, setEndereco] = React.useState({})
  const [numeroCasa, setNumeroCasa] = React.useState()
  const [complemento, setComplemento] = React.useState('')
  const [telefone, setTelefone] = React.useState()
  const [cnh, setCnh] = React.useState()
  const [cep, setCep] = React.useState('')
  const [cartaoCredito, setCartaoCredito] = React.useState()
  const [cvv, setCvv] = React.useState()
  const [vencimento, setVencimento] = React.useState('')

  async function postCadastroVeiculo(){
    axios.post('http://localhost:3002/inserirClientes',{
      cliente: {
        nome: nome,
        cpf: cpf,
        cnh: cnh,
        cep: cep,
        endereco: endereco.logradouro,
        numero: numeroCasa,
        cidade: endereco.localidade,
        estado: endereco.uf,
        bairro: endereco.bairro,
        complemento: complemento,
        telefone: telefone,
        cartaoCredito: cartaoCredito,
        vencimentoCartao: vencimento
      }
    })
    .then((result)=>{
      console.log(result)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  async function getEndereco(cep){
    axios.get('https://viacep.com.br/ws/'+cep+'/json')
    .then((result)=>{
      setEndereco(result.data)
      setTelefone(result.data.ddd)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white'}}>
      <BarraLateral navigation={navigation}/>
      <KeyboardAvoidingView style = {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
        <Text style={stylesCadastro.h1Logo}>Cadastro de Clientes</Text>
        <TextInput style={stylesCadastro.input}
          placeholder="Nome Completo"
          autoCorrect={false} autoCapitalize={'none'} value={nome}
          onChangeText={(str)=>{
            const arr = str.split(' ');
            for (var i = 0; i < arr.length; i++) {
              arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            }
            var nome = arr.join(" ");
            setNome(nome)
            }}/>
        <TextInputMask placeholder = "CPF"
          type={'cpf'}
          value={cpf}
          onChangeText={cpf => {setCpf(cpf)}}
          style={stylesCadastro.input}
        />
        <TextInput style={stylesCadastro.input}
          placeholder="CNH" keyboardType={"number-pad"}
          value={cnh}
          onChangeText={(cnh)=>{setCnh(cnh)}}/>
        <TextInputMask placeholder = "CEP"
          type={'zip-code'}
          value={cep}
          includeRawValueInChangeText={true}
          onChangeText={(maskedText, rawText) => {
            setCep(maskedText)
            if(rawText.length == 8){
              getEndereco(rawText)
            }
          }}
          style={stylesCadastro.input}
        />
        <Text style={stylesCadastro.input}>{endereco.localidade == undefined ? 'Cidade' : endereco.localidade+', '+endereco.uf}</Text>
        <Text style={stylesCadastro.input}>{endereco.logradouro == undefined ? 'Rua' : endereco.logradouro}</Text>
        <Text style={stylesCadastro.input}>{endereco.bairro == undefined ? 'Bairro' : endereco.bairro}</Text>
        <TextInput style={stylesCadastro.input}
          placeholder="Numero" keyboardType={"number-pad"}
          value={numeroCasa}
          onChangeText={(numeroCasa)=>{setNumeroCasa(numeroCasa)}}/>
        <TextInput style={stylesCadastro.input}
          placeholder="Complemento"
          value={complemento}
          onChangeText={(complemento)=>{setComplemento(complemento)}}/>
        <TextInputMask placeholder="Telefone"
          type={'cel-phone'}
          value={telefone}
          onChangeText={telefone => {setTelefone(telefone)}}
          style={stylesCadastro.input}/>
        <TextInputMask
          placeholder="Cart??o de Cr??dito"
          type={'credit-card'}
          options={{
            obfuscated: false,
            issuer: 'visa-or-mastercard'
          }}
          value={cartaoCredito}
          onChangeText={(cartaoCredito) => {setCartaoCredito(cartaoCredito)}}
          style={stylesCadastro.input}
        />
        <TextInputMask
          placeholder="CVV"
          type={'custom'}
          options={{
            mask: '999'
          }}
          value={cvv}
          onChangeText={cvv => {setCvv(cvv)}}
          style={stylesCadastro.input}
        />
        <TextInputMask
          placeholder="Vencimento MM/AA"
          type={'custom'}
          options={{
            mask: '99/99'
          }}
          value={vencimento}
          onChangeText={vencimento => {setVencimento(vencimento)}}
          style={stylesCadastro.input}
        />
        <TouchableOpacity style = {stylesCadastro.btnConfirmar} onPress={()=>{
          postCadastroVeiculo()
        }}>
          <Text style={stylesCadastro.textConfirmar}>Confirmar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

function Veiculos({ navigation }) {
  
  const [placa, setPlaca] = React.useState('')
  const [renavam, setRenavam] = React.useState()
  const [modelo, setModelo] = React.useState('')
  const [fabricante, setFabricante] = React.useState('')
  const [ano, setAno] = React.useState('')
  const [categoria, setCategoria] = React.useState()
  const [useCategoria, setUseCategoria] = React.useState()
  const [disponivel, setDisponivel] = React.useState()
  const [erro, setErro] = React.useState('')

  async function postCadastroVeiculo(){
    axios.post('http://localhost:3002/cadastrarVeiculo',{
      veiculo: {
        placa: placa,
        renavam: renavam,
        modelo: modelo,
        fabricante: fabricante,
        ano: ano,
        disponivel: disponivel,
        categoria: categoria
      }
    })
    .then((result)=>{
      if(result.data.length){
        setErro('Veiculo j?? cadastrado')
        setPlaca(result.data[0].placa)
        setModelo(result.data[0].modelo)
        setFabricante(result.data[0].fabricante)
        setAno(result.data[0].ano)
        setCategoria(result.data[0].categoria_idCategoria)
      }
    })
    .catch((error)=>{
      setErro(error)
    })
  }

  async function postAtualizaCadastroVeiculo(){
    axios.post('http://localhost:3002/atualizarCadastroVeiculo',{
      veiculo:{
        placa: placa,
        renavam: renavam,
        modelo: modelo,
        fabricante: fabricante,
        ano: ano,
        disponivel: disponivel,
        categoria: categoria
      }
    })
    .then((result)=>{
      console.log(result)
      if(result.status === 204){
        setErro(result)
      }else{
        
      }
    })
    .catch((error)=>{
      setErro(error)
    })
  }

  return (
    <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white'}}>
      <BarraLateral navigation={navigation}/>
      <KeyboardAvoidingView style = {{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
        {!erro.length > 0 ? <>
          <Text style={stylesCadastro.h1Logo}>Cadastro de Veiculos</Text>
          <TextInputMask placeholder="Placa"
            type={'custom'}
            options={{
              mask: 'AAA-9*99'
            }}
            value={placa}
            onChangeText={placa=>{setPlaca(placa.toUpperCase())}
            }
            style={stylesCadastro.input}
          />
          <TextInputMask placeholder = "Renavam"
            type={'custom'}
            options={{
              mask: '99999999999'
            }}
            value={renavam}
            onChangeText={renavam => {setRenavam(renavam)}}
            style={stylesCadastro.input}
          />
          <TextInput style={stylesCadastro.input}
          placeholder="Modelo"
          value={modelo}
          onChangeText={(modelo)=>{setModelo(modelo)}}/>
          <TextInput style={stylesCadastro.input}
          placeholder="Fabricante"
          value={fabricante}
          onChangeText={(fabricante)=>{setFabricante(fabricante)}}/>
          <TextInputMask placeholder="Ano"
          type={'custom'}
            options={{
              mask: '9999/9999'
            }}
            value={ano}
            onChangeText={ano => {setAno(ano)}}
            style={stylesCadastro.input}/>
            <Picker
              style={stylesCadastro.input}
              selectedValue={useCategoria}
              onValueChange={(itemValue, itemIndex) => {
                setCategoria(itemIndex)
                setUseCategoria(itemValue)}
              }>
              <Picker.Item label="Selecione um Item" value="Selecione um Item" />
              <Picker.Item label="Carro" value="Carro" />
              <Picker.Item label="Caminh??o" value="Caminh??o" />
              <Picker.Item label="Moto" value="Moto" />
              <Picker.Item label="??nibus" value="??nibus" />
              <Picker.Item label="Van" value="Van" />
            </Picker>
          <TouchableOpacity style = {stylesCadastro.btnConfirmar} onPress={()=>{
            postCadastroVeiculo()
          }}>
            <Text style={stylesCadastro.textConfirmar}>Confirmar</Text>
          </TouchableOpacity>
        </>
        : 
        <>
          <Text style={stylesCadastro.h1Logo}>Atualiza????o de Cadastro de Veiculos</Text>
          <TextInputMask placeholder="Placa"
            type={'custom'}
            options={{
              mask: 'AAA-9*99'
            }}
            value={placa}
            onChangeText={placa=>{setPlaca(placa.toUpperCase())}
            }
            style={stylesCadastro.input}
          />
          <TextInputMask placeholder = "Renavam"
            type={'custom'}
            options={{
              mask: '99999999999'
            }}
            value={renavam}
            onChangeText={renavam => {setRenavam(renavam)}}
            style={stylesCadastro.input}
          />
          <TextInput style={stylesCadastro.input}
          placeholder="Modelo"
          value={modelo}
          onChangeText={(modelo)=>{setModelo(modelo)}}/>
          <TextInput style={stylesCadastro.input}
          placeholder="Fabricante"
          value={fabricante}
          onChangeText={(fabricante)=>{setFabricante(fabricante)}}/>
          <TextInputMask placeholder="Ano"
          type={'custom'}
            options={{
              mask: '9999/9999'
            }}
            value={ano}
            onChangeText={ano => {setAno(ano)}}
            style={stylesCadastro.input}/>
            <Picker
              style={stylesCadastro.input}
              selectedValue={useCategoria}
              onValueChange={(itemValue, itemIndex) => {
                setCategoria(itemIndex)
                setUseCategoria(itemValue)}
              }>
              <Picker.Item label="Selecione um Item" value="Selecione um Item" />
              <Picker.Item label="Carro" value="Carro" />
              <Picker.Item label="Caminh??o" value="Caminh??o" />
              <Picker.Item label="Moto" value="Moto" />
              <Picker.Item label="??nibus" value="??nibus" />
              <Picker.Item label="Van" value="Van" />
            </Picker>
          <Text style={{paddingVertical: 10, fontFamily: 'MontserratBold', color: 'red', fontSize: 16}}>{erro}</Text>
          <TouchableOpacity style = {stylesCadastro.btnConfirmar} onPress={()=>{
            postAtualizaCadastroVeiculo()
            setErro('')
            console.log(erro)
          }}>
            <Text style={stylesCadastro.textConfirmar}>Atualizar Cadastro</Text>
          </TouchableOpacity>
        </>}
      </KeyboardAvoidingView>
    </View>
  );
}

function Categorias({ navigation }) {
  
  return (
    <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'white'}}>
      <BarraLateral navigation={navigation}/>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Voc?? est?? em Categorias</Text>
      </View>
    </View>
  );
}

function BarraLateral({ navigation }) {
  return (
    <View style={{ width: 70, height: (windowHeight-20-20), borderRadius: 20, alignItems: 'center', backgroundColor: '#3FA110', marginLeft: 20, marginTop: 20, marginBottom: 20}}>
      <TouchableOpacity style={{paddingTop: 10}} onPress={()=>{navigation.navigate('Dashboard')}}>
        <AntDesign name="home" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={{paddingTop: 10}} onPress={()=>{navigation.openDrawer();}}>
        <MaterialCommunityIcons name="menu" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={{paddingTop: 10}} onPress={()=>{navigation.openDrawer();}}>
        <AntDesign name="question" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

function Routes({navigation}){
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} tabBarOptions={{showLabel: false}} options={{headerShown: false}}/>
      <Drawer.Screen name="Loca????es" component={Locacao} tabBarOptions={{showLabel: false}} options={{headerShown: false}}/>
      <Drawer.Screen name="Ve??culos" component={Veiculos} tabBarOptions={{showLabel: false}} options={{headerShown: false}}/>
      <Drawer.Screen name="Clientes" component={Clientes} tabBarOptions={{showLabel: false}} options={{headerShown: false}}/>
      <Drawer.Screen name="Categorias" component={Categorias} tabBarOptions={{showLabel: false}} options={{headerShown: false}}/>
    </Drawer.Navigator>
  );
}

const Drawer = createDrawerNavigator();

let customFonts = {
  'MontserratRegular': require('./assets/Fonts/MontserratRegular.ttf'),
  'MontserratBold': require('./assets/Fonts/MontserratBold.ttf'),
};

export default class App extends React.Component{
  state = {
    fontsLoaded: false,
  };
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this._loadFontsAsync();
  }
  render() {
    if (this.state.fontsLoaded) {
      return (
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      );
    }else{
      return(
        <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#3FA110" />
        </View>
      );
    }
  }
}
