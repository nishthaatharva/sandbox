import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { FormItem, FormContainer } from '@/components/ui/Form';
import Alert from '@/components/ui/Alert';
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage';
import useAuth from '@/utils/hooks/useAuth';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const About = () => {
  const [message, setMessage] = useTimeOutMessage();
  const { addUser } = useAuth();

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    try {
      const response = await fetch('https://localhost:7099/api/User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('User added successfully');
      } else {
        setMessage(data.message || 'Failed to add user');
      }
    } catch (error) {
      setMessage('Failed to add user');
    }
    setSubmitting(false);
  };

  const [pwInputType, setPwInputType] = useState('password');

  const onPasswordVisibleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    setPwInputType(pwInputType === 'password' ? 'text' : 'password');
  };

  const passwordVisible = (
    <span
      className="cursor-pointer"
      onClick={(e) => onPasswordVisibleClick(e)}
    >
      {pwInputType === 'password' ? (
        <HiOutlineEyeOff />
      ) : (
        <HiOutlineEye />
      )}
    </span>
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <div style={{ width: '45%' }}> {/* Adjust the width here */}
        <h1>Add User</h1>
        <br></br>
        {message && (
          <Alert showIcon className="mb-4" type="info">
            {message}
          </Alert>
        )}
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormContainer>
                <FormItem
                  label="First Name"
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="firstName"
                    placeholder="First Name"
                    component={Input}
                  />
                  <ErrorMessage name="firstName" component="div" className="error" />
                </FormItem>
                <FormItem
                  label="Last Name"
                >
                  <Field
                    type="text"
                    autoComplete="off"
                    name="lastName"
                    placeholder="Last Name"
                    component={Input}
                  />
                  <ErrorMessage name="lastName" component="div" className="error" />
                </FormItem>
                <FormItem
                  label="Email"
                >
                  <Field
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    component={Input}
                  />
                  <ErrorMessage name="email" component="div" className="error" />
                </FormItem>
                <FormItem
                  label="Password"
                >
                  <Field
                    type={pwInputType}
                    suffix={passwordVisible}
                    autoComplete="off"
                    name="password"
                    placeholder="Password"
                    component={Input}
                  />
                  <ErrorMessage name="password" component="div" className="error" />
                </FormItem>
                <Button
                  block
                  loading={isSubmitting}
                  variant="solid"
                  type="submit"
                >
                  {isSubmitting ? 'Adding user...' : 'Add User'}
                </Button>
              </FormContainer>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default About;
