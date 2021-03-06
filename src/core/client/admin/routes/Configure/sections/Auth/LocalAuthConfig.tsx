import { Localized } from "fluent-react/compat";
import React, { FunctionComponent } from "react";
import { graphql } from "react-relay";

import Header from "../../Header";
import ConfigBoxWithToggleField from "./ConfigBoxWithToggleField";
import RegistrationField from "./RegistrationField";
import TargetFilterField from "./TargetFilterField";

// eslint-disable-next-line no-unused-expressions
graphql`
  fragment LocalAuthConfig_formValues on Auth {
    integrations {
      local {
        enabled
        allowRegistration
        targetFilter {
          admin
          stream
        }
      }
    }
  }
`;

interface Props {
  disabled?: boolean;
}

const LocalAuthConfig: FunctionComponent<Props> = ({ disabled }) => (
  <ConfigBoxWithToggleField
    title={
      <Localized id="configure-auth-local-loginWith">
        <Header container="h2">Login with email authentication</Header>
      </Localized>
    }
    name="auth.integrations.local.enabled"
    disabled={disabled}
    data-testid="configure-auth-local"
  >
    {disabledInside => (
      <>
        <TargetFilterField
          label={
            <Localized id="configure-auth-local-useLoginOn">
              <span>Use email authentication login on</span>
            </Localized>
          }
          name="auth.integrations.local.targetFilter"
          disabled={disabledInside}
        />
        <RegistrationField
          name="auth.integrations.local.allowRegistration"
          disabled={disabledInside}
        />
      </>
    )}
  </ConfigBoxWithToggleField>
);

export default LocalAuthConfig;
