import { SEED_CASES } from '../data/seedSource.js';
import { Case } from '../models/Case.js';
import { isConnectedToMongo } from '../config/db.js';

let inMemoryCases = [...SEED_CASES];

export const getCases = async (req, res, next) => {
  try {
    if (isConnectedToMongo) {
      const cases = await Case.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: cases.length, data: cases });
    }
    res.json({ success: true, count: inMemoryCases.length, data: inMemoryCases });
  } catch (error) {
    next(error);
  }
};

export const getCaseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isConnectedToMongo) {
      const c = await Case.findOne({ id });
      if (!c) return res.status(404).json({ success: false, message: 'Case not found' });
      return res.json({ success: true, data: c });
    }
    const c = inMemoryCases.find(item => item.id === id);
    if (!c) return res.status(404).json({ success: false, message: 'Case not found' });
    res.json({ success: true, data: c });
  } catch (error) {
    next(error);
  }
};

export const createCase = async (req, res, next) => {
  try {
    const newCase = {
      ...req.body,
      id: req.body.id || `CS-${Math.floor(100 + Math.random() * 900)}`,
      createdDate: req.body.createdDate || new Date().toISOString().replace('T', ' ').substring(0, 16),
      pinnedEvidence: req.body.pinnedEvidence || [],
      timeline: req.body.timeline || [
        {
          id: `tl-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          actor: 'Officer S. Sharma',
          action: 'Case Initiated',
          detail: 'Case file officially established under PS-01 protocol.'
        }
      ],
      notes: req.body.notes || []
    };

    if (isConnectedToMongo) {
      const created = await Case.create(newCase);
      return res.status(201).json({ success: true, data: created });
    }

    inMemoryCases.unshift(newCase);
    res.status(201).json({ success: true, data: newCase });
  } catch (error) {
    next(error);
  }
};

export const updateCaseStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const timelineEvent = {
      id: `tl-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actor: 'Officer S. Sharma',
      action: 'Status Transition',
      detail: `Case status changed to '${status}'.`
    };

    if (isConnectedToMongo) {
      const updated = await Case.findOneAndUpdate(
        { id },
        { 
          $set: { status },
          $push: { timeline: { $each: [timelineEvent], $position: 0 } }
        },
        { new: true }
      );
      if (!updated) return res.status(404).json({ success: false, message: 'Case not found' });
      return res.json({ success: true, data: updated });
    }

    const c = inMemoryCases.find(item => item.id === id);
    if (!c) return res.status(404).json({ success: false, message: 'Case not found' });
    c.status = status;
    c.timeline.unshift(timelineEvent);
    res.json({ success: true, data: c });
  } catch (error) {
    next(error);
  }
};

export const addCaseNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content, author = 'Officer S. Sharma' } = req.body;

    const note = {
      id: `nt-${Date.now()}`,
      author,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      content
    };

    const timelineEvent = {
      id: `tl-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actor: author,
      action: 'Forensic Note Logged',
      detail: `Added case memo: "${content.substring(0, 40)}..."`
    };

    if (isConnectedToMongo) {
      const updated = await Case.findOneAndUpdate(
        { id },
        { 
          $push: { 
            notes: { $each: [note], $position: 0 },
            timeline: { $each: [timelineEvent], $position: 0 }
          }
        },
        { new: true }
      );
      if (!updated) return res.status(404).json({ success: false, message: 'Case not found' });
      return res.json({ success: true, data: updated });
    }

    const c = inMemoryCases.find(item => item.id === id);
    if (!c) return res.status(404).json({ success: false, message: 'Case not found' });
    c.notes.unshift(note);
    c.timeline.unshift(timelineEvent);
    res.json({ success: true, data: c });
  } catch (error) {
    next(error);
  }
};

export const removeEvidence = async (req, res, next) => {
  try {
    const { id, evidenceId } = req.params;

    if (isConnectedToMongo) {
      const updated = await Case.findOneAndUpdate(
        { id },
        { $pull: { pinnedEvidence: { id: evidenceId } } },
        { new: true }
      );
      if (!updated) return res.status(404).json({ success: false, message: 'Case not found' });
      return res.json({ success: true, data: updated });
    }

    const c = inMemoryCases.find(item => item.id === id);
    if (!c) return res.status(404).json({ success: false, message: 'Case not found' });
    c.pinnedEvidence = c.pinnedEvidence.filter(e => e.id !== evidenceId);
    res.json({ success: true, data: c });
  } catch (error) {
    next(error);
  }
};

export const addEvidence = async (req, res, next) => {
  try {
    const { id } = req.params;
    const evidenceItem = {
      ...req.body,
      id: req.body.id || `ev-${Date.now()}`
    };

    const timelineEvent = {
      id: `tl-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      actor: req.body.actor || 'Officer S. Sharma',
      action: 'Evidentiary Artifact Pinned',
      detail: `Attached ${evidenceItem.type === 'ACCOUNT' ? `Account #${evidenceItem.accountNumber}` : `Transaction ${evidenceItem.utr || evidenceItem.id}`} to case file.`
    };

    if (isConnectedToMongo) {
      const updated = await Case.findOneAndUpdate(
        { id },
        { 
          $push: { 
            pinnedEvidence: { $each: [evidenceItem], $position: 0 },
            timeline: { $each: [timelineEvent], $position: 0 }
          } 
        },
        { new: true }
      );
      if (!updated) return res.status(404).json({ success: false, message: 'Case not found' });
      return res.status(201).json({ success: true, data: updated });
    }

    const c = inMemoryCases.find(item => item.id === id);
    if (!c) return res.status(404).json({ success: false, message: 'Case not found' });
    c.pinnedEvidence = [evidenceItem, ...(c.pinnedEvidence || [])];
    c.timeline = [timelineEvent, ...(c.timeline || [])];
    res.status(201).json({ success: true, data: c });
  } catch (error) {
    next(error);
  }
};

