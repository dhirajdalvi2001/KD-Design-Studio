import { Button, Input } from '@nextui-org/react';
import React from 'react';

export default function Login() {
  return (
    <form className="flex flex-col justify-center items-center gap-4">
      <Input
        label="Username"
        labelPlacement="outside"
        variant="flat"
        placeholder="Enter your username"
        required
      />
      <Input
        label="Password"
        labelPlacement="outside"
        variant="flat"
        placeholder="Enter your password"
        required
      />
      <Button type="submit" variant="solid" className="rounded-none">
        Login
      </Button>
    </form>
  );
}
