const ClientError = require('../../exceptions/ClientError');

class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  postNoteHandler(req, h) {
    try {
      this._validator.validateNotePayload(req.payload);
      const { title = 'untitled', body, tags } = req.payload;

      const noteId = this._service.addNote({ title, body, tags });

      const res = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      });
      res.code(201);
      return res;
    } catch (err) {
      if (err instanceof ClientError) {
        const res = h.response({
          status: 'fail',
          message: err.message,
        });
        res.code(err.statusCode);
        return res;
      }

      const res = h.response({
        status: 'error',
        message: 'Maaf, terjadi kesalahan pada server kami.',
      });
      res.code(500);
      console.error(err);
      return res;
    }
  }

  getNotesHandler() {
    const notes = this._service.getNotes();
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  getNoteByIdHandler(req, h) {
    try {
      const { id } = req.params;
      const note = this._service.getNoteById(id);
      return {
        status: 'success',
        data: {
          note,
        },
      };
    } catch (err) {
      if (err instanceof ClientError) {
        const res = h.response({
          status: 'fail',
          message: err.message,
        });
        res.code(err.statusCode);
        return res;
      }

      const res = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      res.code(500);
      console.error(err);
      return res;
    }
  }

  putNoteByIdHandler(req, h) {
    try {
      this._validator.validateNotePayload(req.payload);
      const { id } = req.params;

      this._service.editNoteById(id, req.payload);
      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (err) {
      if (err instanceof ClientError) {
        const res = h.response({
          status: 'fail',
          message: err.message,
        });
        res.code(err.statusCode);
        return res;
      }

      const res = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      res.code(500);
      console.error(err);
      return res;
    }
  }

  deleteNoteByIdHandler(req, h) {
    try {
      const { id } = req.params;

      this._service.deleteNoteById(id);
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      };
    } catch (err) {
      if (err instanceof ClientError) {
        const res = h.response({
          status: 'fail',
          message: err.message,
        });
        res.code(err.statusCode);
        return res;
      }

      const res = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      res.code(500);
      console.error(err);
      return res;
    }
  }
}

module.exports = NotesHandler;
