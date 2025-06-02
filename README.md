

Last week, I published ["Bayesian Attention Mechanism: A Probabilistic Framework for Positional Encoding and Context Length Extrapolation"](https://arxiv.org/abs/2505.22842) on arXiv. This paper introduces a novel Bayesian Attention Mechanism that enhances the capabilities of transformer models enabling models to extrapolate context lengths. Outside of the direct contributions of this research, I do believe that it will impact the evaluation of AI related companies.
### Resources
- [Paper](https://arxiv.org/abs/2505.22842)
- [GitHub](https://github.com/ArthurSBianchessi)

### Introduction

Current models have scaled a lot due to the increase in capability of investing more computation in model training. However, there a two quadratic costs that are associated in training larger models:
1. To train a model with twice the number of parameters, you also need twice the amount of data, therefore resulting in a 4x increase in computational cost.
    - By rule of thumb, the number of tokens in the training data should be around 20x the number of parameters in the model, for it to be the best performing model achievable with a given amount of compute. This idea of scaling laws was first introduced in ["Scaling Laws for Neural Language Models"](https://arxiv.org/abs/2001.08361), but the rule of thumb is taken from ["Training Compute-Optimal Large Language Models"](https://arxiv.org/abs/2203.15556).
2. The attention mechanism in transformers has a quadratic cost in the sequence length, which means that doubling the sequence length results in a 4x increase in computational cost.

Altough current model sizes have stagnated, the sequence length has not. Companies such as OpenAI, Google, and Meta have invested extreme resources in increasing the sequence length of their models, resulting in models that can handle millions of tokens. However, in the current literature, there is no way to extrapolate the context length of a model beyond the training data. This means that if a model is trained on 128k tokens, it cannot handle more than 128k tokens at inference time.

In the [paper](https://arxiv.org/abs/2505.22842), we managed to train a small model (~120M) in a sequence length of 512 tokens, and extrapolate the context length of more than 128 000 tokens, beating the context length of models such as [Llama-3](https://arxiv.org/abs/2407.21783). To estimate the saving that would be achieved by using this method, I am going to use the [Llama-3 herd of models](https://arxiv.org/abs/2407.21783) as reference.

### Estimating Savings

Llama-3 main model `Llama-3.1-405B` was trained on around 15 Trillion tokens. These tokens were used in different stages of training, increasing the context length trained on at each stage, the specific scalings used in the training can be found at section 3.4.1 and 3.4.2 of [Llama-3 herd of models](https://arxiv.org/abs/2407.21783). For the sake of simplicity, I am considering:
- 15 Trillion tokens at 8K context length
- 100 Billion tokens at 128K context length 

The reasons for these simplifications are stated in Appendix A.

Considering these variables, we can estimate the proportion of compute that is used in the training of the model at 128K context length. 


$$
\text{Proportion} = \frac{\text{Compute(128K)}}{\text{Compute(8K)} + \text{Compute(128K)}} = \frac{(1 \times 10^{11}) \times 128000^2}{\Big((15 \times 10^{12}) \times 8000^2\Big) + \Big((1 \times 10^{11}) \times 128000^2\Big)} \approx 63.054\% 
$$


This means that around 63% of the compute used in training `Llama-3.1-405B` was used in the training of the model for 128K context length. This is a very rough estimate, but it gives us an idea of the savings that could be achieved by using the Bayesian Attention Mechanism. In this specific case, training the same model would require almost $3\times$ less compute. If we consider context lengths of 1M tokens, the savings are exponentially greater, as the proportion of compute used in training the model at 1M context length would be even lower. As it follows


$$
\text{Proportion} = \frac{\text{Compute(128K)}}{\text{Compute(8K)} + \text{Compute(128K)}} = \frac{(1 \times 10^{11}) \times (10^6)^2}{\Big((15 \times 10^{12}) \times 8000^2\Big) + \Big((1 \times 10^{11}) \times (10^6)^2\Big)} \approx 99.049\%
$$


in this case, the savings would be around $100\times$ less compute. 

### Conclusion
In conclusion, I do believe that the Bayesian Attention Mechanism will result in a significant reduction in the compute required to train models with large context lengths. Yet, I do not believe that these values will directly translate in savings to training models, as these savings should translate in more compute being used in other areas, such as training larger models. I do believe that these savings will be reflected in the dominance of large companies.