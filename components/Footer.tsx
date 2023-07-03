import Container from '@components/Container';
import axios from 'axios';
import cn from 'classnames';
import { useState } from 'react';
import { FaCheck, FaCircleNotch, FaPaperPlane } from 'react-icons/fa';

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const [sentState, setSentState] = useState(false);
  const [errors, setErrors] = useState(null);
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
    <div
      className={cn(
        'fixed bottom-0 -z-10 w-full bg-[#e9eaed] text-[#333] dark:bg-[#2c2d30] dark:text-white md:pt-10',
        {
          'md:pb-10': errors === null,
        },
      )}
    >
      <Container>
        <h2 className="flex justify-center whitespace-nowrap text-3xl font-black leading-[78px] md:text-[60px]">
          Contact
        </h2>
        <div>
          <form onSubmit={handleSubmit} className="grid gap-x-5 gap-y-2 py-4 sm:grid-cols-2">
            <label
              htmlFor="email"
              className="self-center font-graphik text-sm font-medium text-[#333] dark:text-white sm:justify-self-end"
            >
              Your Email:
            </label>
            <div>
              <input
                type="email"
                name="email"
                required
                placeholder="email@domain.com"
                value={email}
                onChange={(e) => handleChange(e)}
                disabled={isLoading}
                className="block w-full rounded-md border border-black/20 bg-white px-3 py-2 font-graphik text-sm font-medium text-white shadow-sm ring-offset-[#e9eaed] transition duration-200 ease-in placeholder:text-gray-400 focus:border-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-white/10 dark:bg-[#424348] dark:ring-offset-[#2c2d30] dark:focus:border-white/10 sm:w-3/4 sm:text-sm lg:w-1/2"
              />
            </div>
            <label
              htmlFor="message"
              className="mt-1 font-graphik text-sm font-medium text-[#333] dark:text-white sm:justify-self-end"
            >
              Your Message:
            </label>
            <div>
              <textarea
                rows={3}
                required
                name="message"
                className="block w-full rounded-md border border-black/20 bg-white px-3 py-2 font-graphik text-sm font-medium text-white shadow-sm ring-offset-[#e9eaed] transition duration-200 ease-in placeholder:text-gray-400 focus:border-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-white/10 dark:bg-[#424348] dark:ring-offset-[#2c2d30] dark:focus:border-white/10 sm:w-3/4 sm:text-sm lg:w-1/2"
                value={message}
                onChange={(e) => handleChange(e)}
                disabled={isLoading}
              />
            </div>
            <div />
            <div>
              <button
                type="submit"
                className="rounded-md border border-transparent bg-[#2189ff] px-3 py-2 text-sm font-medium text-white shadow-sm ring-offset-[#2c2d30] hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                color={!errors && sentState ? 'success' : 'primary'}
                disabled={isLoading}
              >
                {/* eslint-disable-next-line no-nested-ternary */}
                {isLoading ? (
                  <>
                    Sending
                    <FaCircleNotch size="sm" className="ml-2 inline h-3 w-3 animate-spin" />
                  </>
                ) : !errors && sentState ? (
                  <>
                    Sent
                    <FaCheck className="ml-2 inline h-3 w-3" />
                  </>
                ) : (
                  <>
                    Send
                    <FaPaperPlane className="ml-2 inline h-3 w-3" />
                  </>
                )}
              </button>
            </div>
            <div />
            {errors && (
              <div>
                <p className="mb-0 text-base text-red-500">Errors:</p>
                {errors.map((error) =>
                  error.field ? (
                    <p className="mb-0 text-base text-red-300">
                      <span className="capitalize">{error.field}</span>: {error.message}
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
