// Components
import InputField from './components/InputField';

const App = () => {
  return (
    <>
      <InputField
        type='text'
        label='Search Product'
        placeholder='Search any product..'
        onChange={() => {}}
        value=''
      />
    </>
  );
};

export default App;
