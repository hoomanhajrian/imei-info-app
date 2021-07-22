import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";

const options = {
    method: 'POST',
    url: 'https://ismaelc-imei-info.p.rapidapi.com/checkimei',
    params: { password: 'undefined', login: 'undefined' },
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-rapidapi-key': '8bfa5308camsh0ae58dc4106e1eep169c9fjsnc617f9a43c85',
        'x-rapidapi-host': 'ismaelc-imei-info.p.rapidapi.com'
    },
    data: { imei: '355136052818864' }
};


const Imei = () => (
    <>
        <h1>Please insert your (16-digits)IMEI Number:</h1>

        <Formik
            initialValues={{ imei: "", acceptedTerms: false }}
            validate={(values) => {
                const errors = {};
                if (!values.imei) {
                    errors.imei = "Required";
                }

                if (values.imei.toString().length !== 16) {
                    errors.imei = "IMEI must be 16 digits.";
                }

                if (!values.acceptedTerms) {
                    errors.acceptedTerms =
                        "You must check the box before you proceed.";
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {

                axios.request(options).then(function (response) {
                    console.log(response.data);
                }).catch(function (error) {
                    console.error(error);
                });
                setSubmitting(false);

            }}
        >
            {({ isSubmitting, dirty, handleReset }) => (
                <Form>
                    <div>
                        <label>
                            IMEI:
                            <Field type="number" name="imei" />
                        </label>
                        <ErrorMessage name="imei" component="span" />
                    </div>
                    <div>
                        <label>Accept terms</label>
                        <Field type="checkbox" name="acceptedTerms" />
                        <ErrorMessage name="acceptedTerms" component="span" />
                    </div>
                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}
                    >
                        Reset
                    </button>
                    <button type="submit"
                        disabled={isSubmitting}>
                        Get Info
                    </button>
                </Form>
            )}
        </Formik>
    </>
);

export default Imei;