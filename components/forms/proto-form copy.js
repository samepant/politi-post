import { Form, Text, Textarea, FormError, Select, NestedForm } from 'react-form';
import states from './states';

const ProtoForm = (
  <Form
    validate={values => {
      const { message, toAddress, fromAddress } = values
      return {
        message: !message ? 'a message is required' : undefined,
        toAddress: !toAddress ? 'a message is required' : undefined,
        fromAddress: !fromAddress ? 'a message is required' : undefined
      }
    }}
  >
    <h1>From address</h1>
    <NestedForm field='fromAddress'>
      {AddressForm}
    </NestedForm>

    <h1>To address</h1>
    <NestedForm field='toAddress'>
      {AddressForm}
    </NestedForm>

    <h1>Message</h1>
    <Textarea field='message' placeholder='put your message here' />

    <button>submit</button>
  </Form>
);

const AddressForm = (
  <Form 
    validate={values => {
      return {
        addressLine1: !values.addressLine1 ? 'a street address is required' : undefined,
        city: !values.city ? 'a city is required' : undefined,
        state: !values.state ? 'a state is required' : undefined,
        zip: !values.zip ? 'a zip code is required' : undefined
      }
    }}
  >
    <Text
      field='addressLine1'
      placeholder='Street address'
    />
    <Text
      field='city'
      placeholder='city'
    />
    <Select
      field='state'
      placeholder='Choose'
      options={states}
    />
    <Text
      field='zip'
      placeholder='zip'
    />
  </Form>
);

export default () => {
  return (
    <div className='main-form'>
      <ProtoForm 
        onSubmit={(values) => { 
          console.log(JSON.stringify(values, null, 2))
        }}
      />
    </div>
  )
}
