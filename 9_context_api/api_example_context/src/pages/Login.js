import React from 'react'

// Importando o css próprio.

import './Login.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  return (
    <div>
        <section class="vh-100 gradient-custom">
          <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class="card bg-dark text-white style_card_bg_dark">
                  <div class="card-body p-5 text-center">

                    <div class="mb-md-5 mt-md-4 pb-5">

                      <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                      <p class="text-white-50 mb-5">Por favor insira seu e-mail.</p>

                      <div data-mdb-input-init class="form-outline form-white mb-4">
                        <input type="email" id="typeEmailX" class="form-control form-control-lg" />
                        <label class="form-label" for="typeEmailX">Email</label>
                      </div>

                      <div data-mdb-input-init class="form-outline form-white mb-4">
                        <input type="password" id="typePasswordX" class="form-control form-control-lg" />
                        <label class="form-label" for="typePasswordX">Senha</label>
                      </div>

                      <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Esqueci minha senha</a></p>

                      <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Entrar</button>

                      <div class="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" class="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                        <a href="#!" class="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                        <a href="#!" class="text-white"><i class="fab fa-google fa-lg"></i></a>
                      </div>

                    </div>

                    <div>
                      <p class="mb-0">Não tem conta? <a href="#!" class="text-white-50 fw-bold">Crie aqui</a>
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Login