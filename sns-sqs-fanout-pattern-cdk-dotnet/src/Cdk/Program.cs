﻿using Amazon.CDK;

namespace Cdk
{
    sealed class Program
    {
        /// <summary>
        /// Start up method
        /// </summary>
        /// <param name="args">Arguments to pass</param>
        public static void Main(string[] args)
        {
            // If you don't specify 'env', this stack will be environment-agnostic.
            // Account/Region-dependent features and context lookups will not work,
            // but a single synthesized template can be deployed anywhere.

            // Uncomment the next block to specialize this stack for the AWS Account
            // and Region that are implied by the current CLI configuration.
            /*
            Env = new Amazon.CDK.Environment
            {
                Account = System.Environment.GetEnvironmentVariable("CDK_DEFAULT_ACCOUNT"),
                Region = System.Environment.GetEnvironmentVariable("CDK_DEFAULT_REGION"),
            }
            */

            // Uncomment the next block if you know exactly what Account and Region you
            // want to deploy the stack to.
            /*
            Env = new Amazon.CDK.Environment
            {
                Account = "123456789012",
                Region = "us-east-1",
            }
            */

            // For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html
            // Set the name of the stack
            string stackName = "CdkStack";
            var app = new App();
            new CdkStack(app, stackName);

            app.Synth();
        }
    }
}
