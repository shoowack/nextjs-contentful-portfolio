import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPaperPlane, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Container from '@components/Container';

import axios from 'axios';

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const [sentState, setSentState] = useState(false);
  const [errors, setErrors] = useState();
  const [form, setForm] = useState({ email: '', message: '' });

  const handleSubmit = (e) => {
    setIsLoading(true);

    axios({
      url: 'https://formspree.io/f/mqkngagb',
      method: 'post',
      headers: {
        Accept: 'application/json',
      },
      data: form,
    })
      .then(() => {
        setErrors(null);
        setIsLoading(true);
        setSentState(false);

        setTimeout(() => {
          setIsLoading(false);
          setForm({ email: '', message: '' });

          setSentState(true);

          setTimeout(() => {
            setSentState(false);
          }, 5000);
        }, 2000);
      })
      .catch(({ response }) => {
        setErrors(null);
        setIsLoading(true);
        setSentState(false);

        setTimeout(() => {
          setIsLoading(false);
          setSentState(true);
          setErrors(response.data.errors);

          setTimeout(() => {
            setSentState(false);
          }, 5000);
        }, 2000);
      });

    e.preventDefault();
  };

  const handleChange = (e) => {
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const { email, message } = form;

  return (
    <div className="fixed bottom-0 -z-10 w-full bg-[#e9eaed] dark:bg-[#2c2d30] text-[#333] dark:text-white md:py-10">
      <Container>
        <h2 className="text-nowrap flex justify-center text-3xl font-black leading-[78px] md:text-[60px]">
          Contact
        </h2>
        <div>
          <form onSubmit={handleSubmit} className="grid gap-y-2 gap-x-5 py-4 sm:grid-cols-2">
            <label
              htmlFor="email"
              className="self-center font-['Inter'] text-sm font-medium text-[#333] dark:text-white sm:justify-self-end"
            >
              Your Email:
            </label>
            <div>
              <input
                type="email"
                name="email"
                required="required"
                placeholder="email@domain.com"
                value={email}
                onChange={(e) => handleChange(e)}
                disabled={isLoading}
                className="block w-full rounded-md border border-black/20 dark:border-[#424348] bg-white dark:bg-[#424348] py-2 px-3 font-['Inter'] text-sm font-medium text-white placeholder-gray-400 shadow-sm ring-offset-[#2c2d30] transition duration-200 ease-in focus:border-[#424348] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-3/4 sm:text-sm lg:w-1/2"
              />
            </div>
            <label
              htmlFor="message"
              className="mt-1 font-['Inter'] text-sm font-medium text-[#333] dark:text-white sm:justify-self-end"
            >
              Your Message:
            </label>
            <div>
              <textarea
                rows={3}
                required="required"
                name="message"
                className="block w-full rounded-md border border-black/20 dark:border-[#424348] bg-white dark:bg-[#424348] py-2 px-3 font-['Inter'] text-sm font-medium text-white placeholder-gray-400 shadow-sm ring-offset-[#2c2d30] transition duration-200 ease-in focus:border-[#424348] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-3/4 sm:text-sm lg:w-1/2"
                value={message}
                onChange={(e) => handleChange(e)}
                disabled={isLoading}
              />
            </div>
            <div />
            <div>
              <button
                type="submit"
                className="hover:bg-blue rounded-md border border-transparent bg-blue-600 py-2 px-3 text-sm font-medium text-white shadow-sm ring-offset-[#2c2d30] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                color={!errors && sentState ? 'success' : 'primary'}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div>
                    Sending
                    <FontAwesomeIcon icon={faCircleNotch} size="sm" spin="spin" className="ml-2" />
                  </div>
                ) : !errors && sentState ? (
                  <div>
                    Sent
                    <FontAwesomeIcon icon={faCheck} size="sm" className="ml-2" />
                  </div>
                ) : (
                  <div>
                    Send
                    <FontAwesomeIcon icon={faPaperPlane} size="sm" className="ml-2" />
                  </div>
                )}
              </button>
            </div>
            <div />
            {errors && (
              <div>
                <p className="text-danger mb-0">Errors:</p>
                {errors.map((error) =>
                  error.field ? (
                    <p>
                      <span className="text-capitalize">{error.field}</span>: {error.message}
                    </p>
                  ) : (
                    <p>{error.message}</p>
                  ),
                )}
              </div>
            )}
            {!errors && sentState ? 'Your message has been sent!' : ''}
          </form>
        </div>
      </Container>
    </div>
  );
}
